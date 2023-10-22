const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const ejs = require('ejs');
const { match } = require('assert');
const { log } = require('console');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(bodyParser.urlencoded({ extended: true })); // Parse form data
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));



mongoose.connect('mongodb://localhost/allergy_verification', { useNewUrlParser: true });

// Embedded Schema
const PrescriptionSchema = new mongoose.Schema({
  doctorName: String,
  medication: String,
  dosage: String,
  date: String,
});

const PatientSchema = new mongoose.Schema({
  _id : Number,
  name: String,
  problems: String,
  medications: String,
  allergies: String,
  prescriptions: [PrescriptionSchema], // Embed prescriptions
});

const Patient = mongoose.model('Patient', PatientSchema);


const medicineSchema = new mongoose.Schema({
  name: String,
  allergies: [String],
});

const Medicine = mongoose.model('medicines', medicineSchema);


// Routes
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/patient-login', (req, res) => {
  res.render('patient-login');
});

app.post('/patient-login', (req, res) => {
  const { patientId } = req.body;
  Patient.findOne({ _id: patientId }, { prescriptions:1,_id:0,name:1 })
  .then((patient)=>{
    if (!patient) {
      return res.status(404).send('Patient not found');
    }else{
       
      const x = patient.prescriptions
      res.render('patient-prescriptions', { prescriptions: x,pname:patient.name});
    } 
    })

    .catch((err)=>{
      console.log(err)
      return res.status(500).json(err)
    })
  })
app.get('/doctor-prescription', (req, res) => {
  res.render('doctor-prescription');
});

app.post('/api/prescriptions', (req, res) => {
  const { patientId, doctorName, medication, dosage, date } = req.body;
  const newPrescription = { doctorName, medication, dosage, date };
  const medic = newPrescription.medication
  console.log(medic)
  const pui = patientId
  let aller=[]
  var paller=""
  var matchfound = false
  Medicine.findOne({name:medic})
  .then((allergy)=>{

    aller.push(allergy.allergies)
  })
  .catch((err)=>{
      
      aller.push(["NA"])
  })
  Patient.findOne({_id:pui})
  .then((pui)=>{
    paller =pui.allergies;
  })



  setTimeout(() => {
    
    let maller = aller[0]
    let list_paller =stringtolist(paller)
    console.log(maller,list_paller)
    list_paller.forEach(pelement => {
    
    maller.forEach(melement => {
      
        if(melement.includes(pelement)){
          matchfound=true
          
        }

      })



    })
    if (matchfound===true){
      console.log("Finally alert found")
      res.redirect("/alert")
    }else{
      console.log("No allert")
      Patient.findOneAndUpdate({ _id: patientId },{ $push: { prescriptions: newPrescription } })
      .then((patient) => {
          console.log("prescription Entered")
          io.emit('prescription', newPrescription); // Real-time update
          res.redirect('/doctor-prescription');
      })
      .catch((err)=>{
        console.log(err)
        if (err) return res.status(500).json(err);
      })


    }
   
  }, 200);

});

app.get("/alert",(req, res) => {
      res.render("allert-prescription.ejs")
})
app.get('/medicines', async (req, res) => {
 
  Medicine.find()
  .then((med)=>{
    
    if (!med) {
      return res.status(404).send('Patient not found');
    }else{
      const medicinedata = med
      res.render('medicines', { medicines: medicinedata});
    } 
    })
    


});

// Registration Route
app.get('/patient-registration', (req, res) => {
  res.render('patient-registration');
});

app.post('/api/patients', (req, res) => {
  const { _id,name, problems, medications, allergies } = req.body;
  const newPatient = new Patient({ _id,name, problems, medications, allergies, prescriptions: [] });
  newPatient.save()
  .then(() => {
    console.log("saved")
    res.redirect('/patient-login');
  })
  .catch((err)=>{
    console.log(err)
    return res.status(500).json(err)
  })
    
});

// Server
io.on('connection', (socket) => {
  console.log('A user connected');
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

function stringtolist(string){
  let x =string.split(" ")
  
  return x
}