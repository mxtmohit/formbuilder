const express = require("express");
const app = express();
const connectDB = require("./config");
const Form = require("./models/Form");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const { Types } = mongoose;

app.use(cors());

// app.get("/", (req, res) => {
//   res.send("Hello, World!");
// });
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

connectDB();

app.get("/form/:formid", async (req, res) => {
  const formid = req.params?.formid;
  // const formIdToCompare = new Types.ObjectId(formid);
  console.log(req.params);
  try {
    const formData = await Form.findOne({ _id: formid });

    res.status(200).json({ formData });
  } catch (e) {
    console.log(e.message);
    res.status(404).json({ message: "form not available or invalid form" });
    // process.exit(0);
  }
});

app.post("/createform", async (req, res) => {
  let formData = req.body;



  try {
    const newform = new Form(formData);
    const id = newform._id;
    console.log("try");

    await newform.save();

    return res.status(200).json({ id, message: "posted" });
  } catch (e) {
    console.error("catch:", e); 

    // Send an error response
    return res
      .status(500)
      .json({ message: "Unable to create form. Please try later." });
  }
});


app.listen(5000, () => {
  console.log("started");
});
