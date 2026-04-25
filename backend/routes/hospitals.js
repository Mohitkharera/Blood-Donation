const express = require("express")
const router = express.Router()
const Hospital = require("../models/hospital")

// All possible blood types
const BLOOD_TYPES = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

// Function to get random blood types for a hospital
function getRandomBloodTypes() {
  // Each hospital gets 2-5 random blood types
  const numTypes = Math.floor(Math.random() * 4) + 2;
  const shuffled = [...BLOOD_TYPES].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, numTypes);
}

router.get("/", async(req,res)=>{
  const hospitals = await Hospital.find()
  
  // Add random blood types to hospitals that don't have them
  const hospitalsWithBloodTypes = hospitals.map(hospital => {
    const hospitalObj = hospital.toObject();
    
    if (!hospitalObj.bloodTypes || hospitalObj.bloodTypes.length === 0) {
      hospitalObj.bloodTypes = getRandomBloodTypes();
    }
    
    return hospitalObj;
  });
  
  res.json(hospitalsWithBloodTypes)
})

router.post("/add", async(req,res)=>{
  // If bloodTypes not provided, assign random ones
  if (!req.body.bloodTypes || req.body.bloodTypes.length === 0) {
    req.body.bloodTypes = getRandomBloodTypes();
  }
  
  const hospital = new Hospital(req.body)
  await hospital.save()
  res.json(hospital)
})

module.exports = router