const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Donor = require('./models/donor');

const app = express();

app.use(cors());
app.use(express.json());

/* MongoDB Connection */

mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/bloodDonationDB")
.then(()=>console.log("MongoDB Connected"))
.catch(err=>console.log(err));

/* =========================
   Hospital Schema
========================= */

const hospitalSchema = new mongoose.Schema({
  name:String,
  city:String,
  phone:String,
  bloodTypes:[String]
});

const Hospital = mongoose.model("Hospital",hospitalSchema);

/* =========================
   API ROUTES
========================= */

/* Get Hospitals */

// All possible blood types
const BLOOD_TYPES = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

// Function to get random blood types for a hospital
function getRandomBloodTypes() {
  // Each hospital gets 2-5 random blood types
  const numTypes = Math.floor(Math.random() * 4) + 2;
  const shuffled = [...BLOOD_TYPES].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, numTypes);
}

app.get("/api/hospitals",async(req,res)=>{

  const hospitals = await Hospital.find();
  
  // Add random blood types to hospitals that don't have them
  const hospitalsWithBloodTypes = hospitals.map(hospital => {
    const hospitalObj = hospital.toObject();
    
    if (!hospitalObj.bloodTypes || hospitalObj.bloodTypes.length === 0) {
      hospitalObj.bloodTypes = getRandomBloodTypes();
    }
    
    return hospitalObj;
  });

  res.json(hospitalsWithBloodTypes);

});

/* Seed Hospitals (for testing) */
app.post("/api/hospitals/seed", async(req, res) => {
  const sampleHospitals = [
    { name: "City Hospital", address: "123 Main St, Downtown", phone: "+1 555-0101", city: "New York" },
    { name: "Memorial Medical Center", address: "456 Oak Ave, Westside", phone: "+1 555-0102", city: "Los Angeles" },
    { name: "St. Mary's Hospital", address: "789 Elm St, Northside", phone: "+1 555-0103", city: "Chicago" },
    { name: "General Hospital", address: "321 Pine Rd, Eastside", phone: "+1 555-0104", city: "Houston" },
    { name: "Mercy Hospital", address: "654 Maple Dr, Southside", phone: "+1 555-0105", city: "Phoenix" },
    { name: "University Hospital", address: "987 Cedar Ln, Campus", phone: "+1 555-0106", city: "Philadelphia" },
    { name: "Community Health Center", address: "147 Birch St, Downtown", phone: "+1 555-0107", city: "San Antonio" },
    { name: "Regional Medical Center", address: "258 Spruce Ave, Midtown", phone: "+1 555-0108", city: "San Diego" },
    { name: "Children's Hospital", address: "369 Willow Way, Medical District", phone: "+1 555-0109", city: "Dallas" },
    { name: "Heart & Vascular Institute", address: "741 Aspen Blvd, Heart Center", phone: "+1 555-0110", city: "San Jose" }
  ];
  
  try {
    // Clear existing hospitals
    await Hospital.deleteMany({});
    
    // Insert sample hospitals with random blood types
    const hospitalsWithBloodTypes = sampleHospitals.map(h => ({
      ...h,
      bloodTypes: getRandomBloodTypes()
    }));
    
    await Hospital.insertMany(hospitalsWithBloodTypes);
    
    res.json({ 
      message: "Sample hospitals created successfully", 
      count: sampleHospitals.length 
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to seed hospitals", error: err.message });
  }
});

/* Get Donors */

app.get("/api/donors",async(req,res)=>{

  const donors = await Donor.find();

  res.json(donors);

});

/* =========================
   Donor Rewards (Points/Levels)
========================= */

app.get("/api/donor-rewards", async (req, res) => {
  try {
    const donors = await Donor.find();

    const rewards = donors.map((d) => {
      const parsedDonationCount = d && d.donationCount !== undefined && d.donationCount !== null
        ? Number(d.donationCount)
        : NaN;

      const donationCount = !Number.isNaN(parsedDonationCount)
        ? parsedDonationCount
        : Math.floor(Math.random() * 25) + 1; // demo count (NOT saved)

      const points = donationCount * 50;

      let level = 'Beginner Donor';
      if (donationCount >= 20) {
        level = 'Gold Donor';
      } else if (donationCount >= 10) {
        level = 'Silver Donor';
      } else if (donationCount >= 5) {
        level = 'Bronze Donor';
      }

      return {
        name: d.name,
        bloodGroup: d.bloodGroup,
        city: d.city || d.address,
        phone: d.phone,
        points,
        level
      };
    });

    res.json(rewards);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch donor rewards" });
  }
});

/* Smart Donor Matching */

app.get("/api/smart-donors", async (req, res) => {
  try {
    const { bloodGroup, city } = req.query;

    console.log("[SMART DONORS] incoming request", { bloodGroup, city });

    if (!bloodGroup) {
      return res.status(400).json({ message: "bloodGroup is required" });
    }

    const ninetyDaysMs = 90 * 24 * 60 * 60 * 1000;
    const cutoffDate = new Date(Date.now() - ninetyDaysMs);

    const query = {
      bloodGroup: String(bloodGroup)
    };

    if (city) {
      const cityStr = String(city);
      // Match by exact city (case-insensitive) OR city contained in address
      query.$or = [
        { city: new RegExp(`^${cityStr}$`, 'i') },
        { address: new RegExp(cityStr, 'i') }
      ];
    }

    const donors = await Donor.find(query).lean();
    console.log("[SMART DONORS] fetched from MongoDB:", donors.length);

    // Primary filter: respect availability + 90-day rule
    let filtered = donors.filter((d) => {
      if (d.availableForEmergency === false) return false;
      if (!d.lastDonationDate) return true;
      const last = new Date(d.lastDonationDate).getTime();
      return last <= cutoffDate.getTime();
    });

    // If no donors match strict rules, fall back to bloodGroup + city only
    if (filtered.length === 0) {
      console.log("[SMART DONORS] no strict matches, falling back to basic matches");
      filtered = donors;
    }

    filtered.sort((a, b) => {
      const aMissing = !a.lastDonationDate;
      const bMissing = !b.lastDonationDate;

      if (aMissing && !bMissing) return -1;
      if (!aMissing && bMissing) return 1;
      if (aMissing && bMissing) return 0;

      const aDate = new Date(a.lastDonationDate).getTime();
      const bDate = new Date(b.lastDonationDate).getTime();
      return aDate - bDate; // oldest first
    });

    console.log("[SMART DONORS] after filters:", filtered.length);

    res.json(filtered);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch smart donors", error: err.message });
  }
});

/* Create Donor */

app.post("/api/donors", async (req, res) => {
  try {
    const {
      name,
      age,
      gender,
      bloodGroup,
      phone,
      email,
      city,
      state,
      lastDonationDate,
      notes,
      availableForEmergency,
      donorType
    } = req.body;

    const addressParts = [];
    if (city) addressParts.push(city);
    if (state) addressParts.push(state);

    const donor = new Donor({
      name,
      age,
      gender,
      bloodGroup,
      phone,
      email,
      city,
      state,
      address: addressParts.join(", "),
      lastDonationDate: lastDonationDate ? new Date(lastDonationDate) : undefined,
      notes,
      availableForEmergency,
      donorType: donorType || 'blood' // Default to 'blood' if not provided
    });

    await donor.save();

    res.json(donor);
  } catch (err) {
    res.status(500).json({ message: "Failed to create donor", error: err.message });
  }
});

/* =========================
   PORT
========================= */

const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
console.log(`Server running on port ${PORT}`);
});