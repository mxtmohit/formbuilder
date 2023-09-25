const express = require("express");
const app = express();

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

// app.get("/", (req, res) => {
//   res.send("Hello, World!");
// });
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

connectDB();

app.post("/auth/signup", async (req, res) => {
  const { email, password } = req.body;
  const fname = req.body.firstname;
  const lname = req.body.lastname;

  try {
    if (await User.findOne({ email })) {
      return res.json({ message: "email already exist" });
    } else {
      const user = User({ email, password, firstname: fname, lastname: lname });
      await user.save();
      return res.status(200).json({ message: "account created successfully" });
    }
  } catch (e) {
    console.log(e.message);
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
    res.status(200).json({ formData, isAdmin });
  } catch (e) {
    console.log(e.message);
    res.status(404).json({ message: "form not available or invalid form" });
    // process.exit(0);
  }
});

app.post("/createform", verifytoken, async (req, res) => {
  let formData = req.body.formData;
  console.log(req.body.formid);
  if (req.body.formid) {
    try {
      await Form.updateOne(
         { _id: req.body.formid }, // Query to find the document(s) to update
         { $set: { qnData: formData.qnData, title: formData.title } } // Update operation
       );
      // const newform = new Form(formData);
      // const formids = await Form.findOne({ "title._id": req.body.formid });
      // console.log(formids)
      const id = req.body.formid;

      // await newform.save();

      return res.status(202).json({ id, message: "Form updated" });
    } catch (e) {
      console.error("catch:", e);
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
    const user = req.query.user;
    const forms = await Form.find({ user: user });
    return res.json({ forms });
  } catch (e) {
    console.log(e.message);
    return res.json({ message: "couldn send any form, server error" });

  }
});

app.post("/submit", verifytoken, async () => {
  const { user, data, formid } = req.data;
  const formResponse = FormResponse({ formid, response, user });
  try {
    await formResponse.save();
    return res.json({ message: "Form Submitted Successfully" });
  } catch {
    return res
      .status(401)
      .json({ message: "could not submit your form at the moment" });
  }
});

app.listen(5000, () => {
  console.log("started");
});
