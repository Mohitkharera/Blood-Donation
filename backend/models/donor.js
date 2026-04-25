const mongoose = require("mongoose")

const donorSchema = new mongoose.Schema({
  name: String,
  age: Number,
  gender: String,
  bloodGroup: String,
  phone: String,
  email: String,
  city: String,
  state: String,
  address: String,
  lastDonationDate: Date,
  // Optional: may exist in MongoDB for reward systems.
  donationCount: Number,
  notes: String,
  availableForEmergency: Boolean,
  donorType: String // 'blood' or 'plasma'
});

module.exports = mongoose.model("Donor", donorSchema)