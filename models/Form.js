const mongoose = require("mongoose");
// const {Schema} =require('mongoose')

const optionarraySchema = mongoose.Schema({
  label: { type: String },
  value: { type: String },
  id: { type: String },
});

const optionSchema = mongoose.Schema({
  type: { type: Number },
  optionarray: [optionarraySchema],
});

const qnSchema = mongoose.Schema({
  itemid: { type: String, required: true },
  Qntext: { type: String, required: true },
  Options: optionSchema,
});

const titleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
});


const formSchema = mongoose.Schema(
  [
    { title: titleSchema },
    { qnData: [qnSchema] },
    { user: { type: String, required: true } },
    {
      starttime: { type: Date },
    },
    { endtime: { type: Date } },
  ],

  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

const Form = mongoose.model("form", formSchema);
module.exports = Form;
