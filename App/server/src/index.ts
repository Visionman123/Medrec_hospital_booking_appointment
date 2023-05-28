import dbConnection from "./db-connection";
import dotenv from 'dotenv';
dotenv.config();

import path, { parse } from 'path';

import base64 from 'base-64';

import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import authenticateUser from "./authenticate-user";     
import authorizeUser from "./authorize-user";
import validateTokenValue from "./validate-token-value";
import refreshToken from "./refresh-token";
import getRemainingSchedule from "./get-remaining-schedule";
import getFinishedSchedule from "./get-finished-schedule";
import patientViewRecordHistory from "./patient-view-record-history";
import patientViewAllRecords from "./patient-view-all-records";
import insertInformation from "./insert-information";
import insertPrescription from "./insert-prescription";
import doctorGetPrescription from "./doctor-get-prescription";
import getDoctors from "./get-doctors";
import makeAppointment from "./make-appointment";
import getAppointments from "./get-appointments";
import patientGetPrescription from "./patient-get-prescription";
import editProfile from "./edit-profile";
import validateUsername from "./validate-username";
import register from "./register";
import getDepartments from "./get-departments";
import getMedicine from "./get-medicine";
import getPatientRecord from "./get-patient-record";
import getPatientInfo from "./handlers/get-patient-info";

const app = express();
app.use(cookieParser())
app.use(morgan('combined'));
app.use(bodyParser.json());

const port = process.env.PORT;

app.use(cors({credentials: true, origin: true}));
app.use('/GUI_Doctor', express.static(path.join(__dirname, '../../GUI_Doctor')));
app.use('/GUI_Patient', express.static(path.join(__dirname, '../../GUI_Patient')));


const connection = dbConnection.execute();

// for signup
app.post('/signup', async (req, res) => {
    if (!connection) {
        console.log("Cannot connect to database");
    }

    const username = req.body.username;
    const password = req.body.password;

    if (!await validateUsername.execute(connection, username)) {
        res.send("Failure");
        return;
    }

    await register.execute(connection, username, password);

    res.status(200).send("Success")
})

// for signin
app.post('/signin', async (req, res) => {
    if (!connection) {
        console.log("Cannot connect to database");
    }

    const username = req.body.username!.toString();
    const password = req.body.password!.toString();

    const user = await authenticateUser.execute(connection, username, password);
    
    if (user) {
        res.cookie('jwt', user.token, {
            httpOnly: true,
            sameSite: "none",
            secure: true,
            maxAge: 3600000,  
        })

        res.cookie('refresh', user.refreshToken, {
            httpOnly: true,
            sameSite: "none",
            secure: true,
            maxAge: 3600000,  
        })

        res.send(user);

    }
    else { 
        res.send("Not Found");
    }
})

// for authorization, i.e when user routes to non-public pages that require token validation
app.get('/auth', async (req, res) => {
    if (!connection) {
        console.log("Cannot connect to database");
    }

    const token = req.cookies.jwt;
    console.log(token)
    if (!token) {
        res.send("Failure");
        return;
    }


    //validate token
    if (!await validateTokenValue.execute(connection, token)) {
        res.send('Failure');
        return;
    }
    
    const payloadArr = token.split('.')[1];
    
    const payload = base64.decode(payloadArr);

    const status = await authorizeUser.execute(connection, payload);
    
    if (status === 200) {
        res.send('Success');
    }
    else {
        res.send('Failure');
    }
})


// token refresh
app.post('/refresh', async (req, res) => {
    if (!connection) {
        console.log("Cannot connect to database");
    }

    const refToken = req.cookies.refresh;
    if (!refToken) {
        res.send("Failure");
        return;
    }

    const payloadArr = refToken.split('.')[1];
    
    const payload = base64.decode(payloadArr);

    const newToken = await refreshToken.execute(connection, payload);
    
    if (newToken) {
        //update access token
        res.cookie('jwt', newToken, {
            httpOnly: true,
            sameSite: "none",
            secure: true,
            maxAge: 3600000,  
        })
        res.send('Success');
    }
    else {
        res.send('Failure');
    }
})


// doctor's remaining schedule today
app.get('/remaining_schedule', async (req, res) => {
    if (!connection) {
        console.log("Cannot connect to database");
    }

    const doctorId = req.query.doctorId.toString();
    const schedule = await getRemainingSchedule.execute(connection, parseInt(doctorId));

    res.send(schedule);
})

// doctor's finished schedule today
app.get('/finished_schedule', async (req, res) => {
    if (!connection) {
        console.log("Cannot connect to database");
    }

    const doctorId = req.query.doctorId.toString();
    const schedule = await getFinishedSchedule.execute(connection, parseInt(doctorId));

    res.send(schedule);
})

// patient's record
app.get('/record', async (req, res) => {
    if (!connection) {
        console.log("Cannot connect to database");
    }
    const patientId = req.query.patientId.toString();
    const patient = await getPatientRecord.execute(connection, parseInt(patientId));

    if (patient) {
        res.send(patient);
    }
})

// patient's record
app.get('/patient_view_record_history', async (req, res) => {
    if (!connection) {
        console.log("Cannot connect to database");
    }
    const patientId = req.query.patientId.toString();
    const doctorId = req.query.doctorId.toString();
    const date = req.query.presDate.toString();
    const patient = await patientViewRecordHistory.execute(connection, parseInt(patientId), parseInt(doctorId), date);

    if (patient) {
        res.send(patient);
    }
})

app.get('/patient_view_all_records', async(req, res) => {
    if (!connection) {
        console.log("Cannot connect to database");
    }
    const patientId = req.query.patientId.toString();
    const allRecords = await patientViewAllRecords.execute(connection, parseInt(patientId));
    if (allRecords) {
        res.send(allRecords);
    }
})

// add info such as indication adn diagnosis
app.post('/add_information', async (req, res) => {
    if (!connection) {
        console.log("Cannot connect to database");
    }

    const doctorId = req.body.doctorId;
    const patientId = req.body.patientId;
    const indication = req.body.indication;
    const diagnosis = req.body.diagnosis;
    
    const presId =  await insertInformation.execute(connection, doctorId, patientId, indication, diagnosis);
    res.status(200).send(presId.toString());
})

// add prescription
app.post('/add_prescription', async (req, res) => {
    if (!connection) {
        console.log("Cannot connect to database");
    }

    const inputMed = req.body.inputMed;
    const prescriptionId = req.body.presId;
    const inputPurpose = req.body.inputPurpose;
    const inputDosage = req.body.inputDosage;
    const inputRoute = req.body.inputRoute;
    const inputFrequency = req.body.inputFrequency;

    await insertPrescription.execute(connection, inputMed, prescriptionId, inputPurpose, inputDosage, inputRoute, inputFrequency);

    res.status(200).send("Insertion success");
})

// view prescriptions as doctor
app.get('/prescriptions/doctor', async (req, res) => {
    if (!connection) {
        console.log("Cannot connect to database");
    }

    const patientId = req.query.patientId.toString();
    const doctorId = req.query.doctorId.toString();
    const presDate = req.query.presDate.toString();

    const patientWithPrescription = await doctorGetPrescription.execute(connection, parseInt(doctorId), parseInt(patientId), presDate);

    if (patientWithPrescription) {
        res.send(patientWithPrescription);
    }
})

// doctor's deps
app.get('/departments', async (req, res) => {
    if (!connection) {
        console.log("Cannot connect to database");
    }

    const departments = await getDepartments.execute(connection);

    res.send(departments);
})

// doctors
app.get('/doctors', async (req, res) => {
    if (!connection) {
        console.log("Cannot connect to database");
    }
    const doctors = await getDoctors.execute(connection);

    res.send(doctors);
})

// patient books an appoinment
app.post('/make_appointment', async (req, res) => {
    if (!connection) {
        console.log("Cannot connect to database");
    }

    const doctorId = req.body.doctorId;
    const patientId = req.body.patientId;
    const date = req.body.date;
    const time = req.body.time;

    const alert = await makeAppointment.execute(connection, doctorId, patientId, date, time);

    res.status(200).send(alert);
})

// appointments
app.get('/appointments', async (req, res) => {
    if (!connection) {
        console.log("Cannot connect to database");
    }

    const patientId = req.query.patientId.toString();
    const appointments = await getAppointments.execute(connection, parseInt(patientId));

    res.send(appointments);
})


// view prescription
app.get('/prescriptions/patient', async (req, res) => {
    if (!connection) {
        console.log("Cannot connect to database");
    }

    const doctorId = req.query.doctorId.toString();
    const patientId = req.query.patientId.toString();

    const prescriptions = await patientGetPrescription.execute(connection, parseInt(doctorId), parseInt(patientId));

    res.send(prescriptions);
})

// get all meds in database
app.get('/get_med', async (req, res) => {
    if (!connection) {
        console.log("Cannot connect to database");
    }

    const med = await getMedicine.execute(connection);

    res.send(med);
})

// view patient's profile
app.get('/profile', async (req, res) => {
    if (!connection) {
        console.log("Cannot connect to database");
    }

    const patientId = req.query.patientId.toString();
    const patientInfo = await getPatientInfo.execute(connection, parseInt(patientId));

    res.send(patientInfo);
})

// patient edits profile
app.post('/edit_profile', async (req, res) => {
    if (!connection) {
        console.log("Cannot connect to database");
    }


    const patientId = req.body.patientId.toString();
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const dob = req.body.dob;
    const sex = req.body.sex;
    const email = req.body.email;

    const phone = req.body.phone; 
    const address = req.body.address; 
    const notes = req.body.notes;

    await editProfile.execute(connection, parseInt(patientId), firstName, lastName, dob, sex, email, phone, address, notes);

    res.status(200).send("Edit success");
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});