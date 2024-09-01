const { default: mongoose } = require("mongoose");

const leadSchema = new mongoose.Schema(
  {
    channelPartnerCode: String,
    leadName: String,
    contactNumber: String,
    emailId: String,
    leadSource: String,
    leadInterest: String,
    additionalNotes: String,
  },
  { timestamps: true }
);

const Lead = mongoose.model("Lead", leadSchema);

module.exports = Lead;
