const mongoose=require("mongoose")

const responseSchema=mongoose.Schema.Types.Mixed

const formResponseSchema = mongoose.Schema({
  formid: { type: String, require: true },
  response: [responseSchema],
  user: { type: String, require: true },
  submittedAt: { type: Date, default: Date.now },
});

const FormResponse=mongoose.model("formresponse",formResponseSchema)
module.exports=FormResponse