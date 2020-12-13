const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const profileSchema = new Schema({
  id: {
    type: String,
  },
  empID:{
    type: Number,
    required: true,
  },
  empName: {
    type: String,
    required: true,
  },
  empSal: {
    type: Number,
    required: true,
  },
});

const Profile = mongoose.model("Profile", profileSchema);
module.exports = Profile;