const mongoose = require("mongoose")

const hospitalSchema = new mongoose.Schema({

name:String,
phone:String,
email:String,
address:String,
bloodTypes:[String]

})

module.exports = mongoose.model("Hospital", hospitalSchema)