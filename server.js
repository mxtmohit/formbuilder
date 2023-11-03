const express = require("express");
const app = express();
const path = require("path");

const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const Form = require("./models/Form");
const User = require("./models/User");
const connectDB = require("./config/dbConfig");
const verifytoken = require("./middleware/jwt");
const jwt = require("jsonwebtoken");
const FormResponse = require("./models/FormResponse");

app.use(cors());

const PORT = process.env.PORT || 5000;

// app.get("/", (req, res) => {
//   res.send("Hello, World!");
// });
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());



app.post("/auth/signup", async (req, res) => {
  const { email, password } = req.body;
  const fname = req.body.firstname;
  const lname = req.body.lastname;
  //console.log(req.body)

  try {
    if (await User.findOne({ email })) {
      return res.json({ message: "email already exist" });
    } else {
      const user = User({ email, password, firstname: fname, lastname: lname });
      await user.save();
      const token = jwt.sign(
        { userId: user._id, username: user.email },
        process.env.SECRET_KEY, // Change this to your own secret key
        { expiresIn: "24h" } // Token expiration time
      );

      return res
        .status(200)
        .json({ message: "account created successfully", user, token });
    }
  } catch (e) {
    // console.log(e.message);
    return res.json({
      message: "could not create your account try again later",
    });
  }
});

app.post("/auth/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(401).json({ message: "Authentication failed" });
    }
    // const isPasswordValid = await bcrypt.compare(password, user.password);

    // if (!isPasswordValid) {
    //   return res.status(401).json({ message: "Authentication failed" });
    // }
    if (password == user.password) {
      const token = jwt.sign(
        { userId: user._id, username: user.email },
        process.env.SECRET_KEY, // Change this to your own secret key
        { expiresIn: "24h" } // Token expiration time
      );

      return res.status(200).json({ user, token });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get("/form/:formid", verifytoken, async (req, res) => {

  
  const formid = req.params?.formid;
  // const formIdToCompare = new Types.ObjectId(formid);

  try {
    const formData = await Form.findOne({ _id: formid });
    const requser = req.user.username;
    const resuser = formData.user;
    const isAdmin = requser == resuser;

    const timestart = formData.starttime;
    const timeend = formData.endtime;

 
    if (isAdmin)
      return res
        .status(200)
        .json({
          formData,
          isAdmin,
          message: "apne hi to form banaya hai apko nhi to kisko bhejunga",
        });

  

    if (timestart < new Date() && new Date() < timeend) {
     

      return res.status(200).json({ formData, isAdmin,message:"cant" });
    } else if (timestart > Date.now()) {
      return res
        .status(201)
        .json({
          message: "form is not available yet",
          timestart: Math.floor(timestart - Date.now()),
          isalive: true,
        });
    } else return res.status(201).json({ message: "form is ixpired", timeend });
  } catch (e) {
    console.log(e.message);
    res.status(404).json({ message: "form not available or invalid form" });
    // process.exit(0);
  }
});

app.post("/createform", verifytoken, async (req, res) => {
  let formData = req.body.formData;
  // console.log("formid=",req.body.formid);
  if (req.body.formid) {
    try {
      await Form.updateOne(
        { _id: req.body.formid }, // Query to find the document(s) to update
        {
          $set: {
            qnData: formData.qnData,
            title: formData.title,
            starttime: formData.starttime,
            endtime: formData.endtime,
          },
        } // Update operation
      );
      // const newform = new Form(formData);
      // const formids = await Form.findOne({ "title._id": req.body.formid });
      // console.log(formids)
      const id = req.body.formid;

      // await newform.save();

      return res.status(202).json({ id, message: "Form updated" });
    } catch (e) {
    
      return res
        .status(500)
        .json({ message: "Unable to create form. Please try later." });
    }
  } else {
    try {
      const newform = new Form(formData);
      const id = newform._id;

      await newform.save();

      return res.status(200).json({ id, message: "posted" });
    } catch (e) {
      console.error("catch:", e);
      return res
        .status(500)
        .json({ message: "Unable to create form. Please try later." });
    }
  }
});

app.get("/getforms", verifytoken, async (req, res) => {
  try {
    const user = req.user.username;
    const forms = await Form.find({ user: user });
    return res.json({ forms });
  } catch (e) {
    
    return res.json({ message: "couldn send any form, server error" });
  }
});

app.post("/form/submit", verifytoken, async (req, res) => {
  //console.log(req)
  const { formid } = req.body;
  const responseData = req.body.responseData;
  const user = req.user.username;
  const formResponse = FormResponse({ formid, response: responseData, user });
  try {
    await formResponse.save();
    return res.json({ message: "Form Submitted Successfully" });
  } catch {
    return res
      .status(401)
      .json({ message: "could not submit your form at the moment" });
  }
});

app.get("/getresponse/:formid", verifytoken, async (req, res) => {
  
  const { formid } = req.params;
  const user = req.user.username;
  try {
    const form = await Form.findOne({ _id: formid, user: user });
    // console.log(form)
    if (form) {
      const allresponses = await FormResponse.find({ formid: form._id });
      return res.status(200).json({ allresponses, message: "success" });
    } else {
     
    }
  } catch (e) {
   
  }
});

app.use(express.static(path.join(__dirname, "./Frontend/build")));

app.get("/", function (_, res) {
  res.sendFile(
    path.join(__dirname, "./Frontend/build/index.html"),
    function (err) {
      res.status(500).send(err);
    }
  );
});

connectDB();

app.listen(PORT, () => {
  console.log("started");
});
