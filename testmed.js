const mongoose = require('mongoose');

// MongoDB connection setup
mongoose.connect('mongodb://localhost:27017/allergy_verification', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define a Mongoose model for medicines (if not already defined)
const medicineSchema = new mongoose.Schema({
  name: String,
  allergies: [String],
});

const Medicine = mongoose.model('Medicine', medicineSchema);

// Medicine data to insert
const medicineData = [
  { name: "aspirin", allergies: ["rash", "hives", "swelling"] },
  { name: "penicillin", allergies: ["difficulty breathing", "swelling of face", "lips", "tongue"] },
  { name: "ibuprofen", allergies: ["skin itching", "blurred vision", "nausea"] },
  { name: "lisinopril", allergies: ["cough", "swelling of the face", "angioedema"] },
  { name: "metformin", allergies: ["skin rash", "itching", "hives"] },
  { name: "simvastatin", allergies: ["muscle pain", "weakness", "dark urine"] },
  { name: "albuterol", allergies: ["difficulty breathing", "chest pain", "rapid heart rate"] },
  { name: "amoxicillin", allergies: ["rash", "itching", "swelling"] },
  { name: "omeprazole", allergies: ["difficulty breathing", "swelling of face", "lips", "throat"] },
  { name: "citalopram", allergies: ["skin rash", "hives", "swelling of face or lips"] },
  { name: "prednisone", allergies: ["skin rash", "itching", "swelling of face, lips", "tongue"] },
  { name: "warfarin", allergies: ["difficulty breathing", "chest tightness", "swelling"] },
  { name: "atorvastatin", allergies: ["muscle pain", "weakness", "dark urine"] },
  { name: "loratadine", allergies: ["dizziness", "dry mouth", "headache"] },
  { name: "cephalexin", allergies: ["rash", "itching", "swelling"] }
];

// Insert the data into the MongoDB collection
async function insertMedicineData() {
  try {
    await Medicine.insertMany(medicineData);
    console.log('Medicine data inserted successfully.');
  } catch (error) {
    console.error('An error occurred:', error);
  } finally {
    mongoose.connection.close();
  }
}

// Run the data insertion function
insertMedicineData();
