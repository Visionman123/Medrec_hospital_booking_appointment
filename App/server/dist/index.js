"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_connection_1 = __importDefault(require("./db-connection"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const path_1 = __importDefault(require("path"));
const base_64_1 = __importDefault(require("base-64"));
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const authenticate_user_1 = __importDefault(require("./authenticate-user"));
const authorize_user_1 = __importDefault(require("./authorize-user"));
const validate_token_value_1 = __importDefault(require("./validate-token-value"));
const refresh_token_1 = __importDefault(require("./refresh-token"));
const get_remaining_schedule_1 = __importDefault(require("./get-remaining-schedule"));
const get_finished_schedule_1 = __importDefault(require("./get-finished-schedule"));
const patient_view_record_history_1 = __importDefault(require("./patient-view-record-history"));
const patient_view_all_records_1 = __importDefault(require("./patient-view-all-records"));
const insert_information_1 = __importDefault(require("./insert-information"));
const insert_prescription_1 = __importDefault(require("./insert-prescription"));
const doctor_get_prescription_1 = __importDefault(require("./doctor-get-prescription"));
const get_doctors_1 = __importDefault(require("./get-doctors"));
const make_appointment_1 = __importDefault(require("./make-appointment"));
const get_appointments_1 = __importDefault(require("./get-appointments"));
const patient_get_prescription_1 = __importDefault(require("./patient-get-prescription"));
const edit_profile_1 = __importDefault(require("./edit-profile"));
const validate_username_1 = __importDefault(require("./validate-username"));
const register_1 = __importDefault(require("./register"));
const get_departments_1 = __importDefault(require("./get-departments"));
const get_medicine_1 = __importDefault(require("./get-medicine"));
const get_patient_record_1 = __importDefault(require("./get-patient-record"));
const get_patient_info_1 = __importDefault(require("./handlers/get-patient-info"));
const app = (0, express_1.default)();
app.use((0, cookie_parser_1.default)());
app.use((0, morgan_1.default)('combined'));
app.use(body_parser_1.default.json());
const port = process.env.PORT;
app.use((0, cors_1.default)({ credentials: true, origin: true }));
app.use('/GUI_Doctor', express_1.default.static(path_1.default.join(__dirname, '../../GUI_Doctor')));
app.use('/GUI_Patient', express_1.default.static(path_1.default.join(__dirname, '../../GUI_Patient')));
const connection = db_connection_1.default.execute();
// for signup
app.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!connection) {
        console.log("Cannot connect to database");
    }
    const username = req.body.username;
    const password = req.body.password;
    if (!(yield validate_username_1.default.execute(connection, username))) {
        res.send("Failure");
        return;
    }
    yield register_1.default.execute(connection, username, password);
    res.status(200).send("Success");
}));
// for signin
app.post('/signin', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!connection) {
        console.log("Cannot connect to database");
    }
    const username = req.body.username.toString();
    const password = req.body.password.toString();
    const user = yield authenticate_user_1.default.execute(connection, username, password);
    if (user) {
        res.cookie('jwt', user.token, {
            httpOnly: true,
            sameSite: "none",
            secure: true,
            maxAge: 3600000,
        });
        res.cookie('refresh', user.refreshToken, {
            httpOnly: true,
            sameSite: "none",
            secure: true,
            maxAge: 3600000,
        });
        res.send(user);
    }
    else {
        res.send("Not Found");
    }
}));
// for authorization, i.e when user routes to non-public pages that require token validation
app.get('/auth', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!connection) {
        console.log("Cannot connect to database");
    }
    const token = req.cookies.jwt;
    console.log(token);
    if (!token) {
        res.send("Failure");
        return;
    }
    //validate token
    if (!(yield validate_token_value_1.default.execute(connection, token))) {
        res.send('Failure');
        return;
    }
    const payloadArr = token.split('.')[1];
    const payload = base_64_1.default.decode(payloadArr);
    const status = yield authorize_user_1.default.execute(connection, payload);
    if (status === 200) {
        res.send('Success');
    }
    else {
        res.send('Failure');
    }
}));
// token refresh
app.post('/refresh', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!connection) {
        console.log("Cannot connect to database");
    }
    const refToken = req.cookies.refresh;
    if (!refToken) {
        res.send("Failure");
        return;
    }
    const payloadArr = refToken.split('.')[1];
    const payload = base_64_1.default.decode(payloadArr);
    const newToken = yield refresh_token_1.default.execute(connection, payload);
    if (newToken) {
        //update access token
        res.cookie('jwt', newToken, {
            httpOnly: true,
            sameSite: "none",
            secure: true,
            maxAge: 3600000,
        });
        res.send('Success');
    }
    else {
        res.send('Failure');
    }
}));
// doctor's remaining schedule today
app.get('/remaining_schedule', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!connection) {
        console.log("Cannot connect to database");
    }
    const doctorId = req.query.doctorId.toString();
    const schedule = yield get_remaining_schedule_1.default.execute(connection, parseInt(doctorId));
    res.send(schedule);
}));
// doctor's finished schedule today
app.get('/finished_schedule', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!connection) {
        console.log("Cannot connect to database");
    }
    const doctorId = req.query.doctorId.toString();
    const schedule = yield get_finished_schedule_1.default.execute(connection, parseInt(doctorId));
    res.send(schedule);
}));
// patient's record
app.get('/record', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!connection) {
        console.log("Cannot connect to database");
    }
    const patientId = req.query.patientId.toString();
    const patient = yield get_patient_record_1.default.execute(connection, parseInt(patientId));
    if (patient) {
        res.send(patient);
    }
}));
// patient's record
app.get('/patient_view_record_history', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!connection) {
        console.log("Cannot connect to database");
    }
    const patientId = req.query.patientId.toString();
    const doctorId = req.query.doctorId.toString();
    const date = req.query.presDate.toString();
    const patient = yield patient_view_record_history_1.default.execute(connection, parseInt(patientId), parseInt(doctorId), date);
    if (patient) {
        res.send(patient);
    }
}));
app.get('/patient_view_all_records', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!connection) {
        console.log("Cannot connect to database");
    }
    const patientId = req.query.patientId.toString();
    const allRecords = yield patient_view_all_records_1.default.execute(connection, parseInt(patientId));
    if (allRecords) {
        res.send(allRecords);
    }
}));
// add info such as indication adn diagnosis
app.post('/add_information', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!connection) {
        console.log("Cannot connect to database");
    }
    const doctorId = req.body.doctorId;
    const patientId = req.body.patientId;
    const indication = req.body.indication;
    const diagnosis = req.body.diagnosis;
    const presId = yield insert_information_1.default.execute(connection, doctorId, patientId, indication, diagnosis);
    res.status(200).send(presId.toString());
}));
// add prescription
app.post('/add_prescription', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!connection) {
        console.log("Cannot connect to database");
    }
    const inputMed = req.body.inputMed;
    const prescriptionId = req.body.presId;
    const inputPurpose = req.body.inputPurpose;
    const inputDosage = req.body.inputDosage;
    const inputRoute = req.body.inputRoute;
    const inputFrequency = req.body.inputFrequency;
    yield insert_prescription_1.default.execute(connection, inputMed, prescriptionId, inputPurpose, inputDosage, inputRoute, inputFrequency);
    res.status(200).send("Insertion success");
}));
// view prescriptions as doctor
app.get('/prescriptions/doctor', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!connection) {
        console.log("Cannot connect to database");
    }
    const patientId = req.query.patientId.toString();
    const doctorId = req.query.doctorId.toString();
    const presDate = req.query.presDate.toString();
    const patientWithPrescription = yield doctor_get_prescription_1.default.execute(connection, parseInt(doctorId), parseInt(patientId), presDate);
    if (patientWithPrescription) {
        res.send(patientWithPrescription);
    }
}));
// doctor's deps
app.get('/departments', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!connection) {
        console.log("Cannot connect to database");
    }
    const departments = yield get_departments_1.default.execute(connection);
    res.send(departments);
}));
// doctors
app.get('/doctors', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!connection) {
        console.log("Cannot connect to database");
    }
    const doctors = yield get_doctors_1.default.execute(connection);
    res.send(doctors);
}));
// patient books an appoinment
app.post('/make_appointment', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!connection) {
        console.log("Cannot connect to database");
    }
    const doctorId = req.body.doctorId;
    const patientId = req.body.patientId;
    const date = req.body.date;
    const time = req.body.time;
    const alert = yield make_appointment_1.default.execute(connection, doctorId, patientId, date, time);
    res.status(200).send(alert);
}));
// appointments
app.get('/appointments', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!connection) {
        console.log("Cannot connect to database");
    }
    const patientId = req.query.patientId.toString();
    const appointments = yield get_appointments_1.default.execute(connection, parseInt(patientId));
    res.send(appointments);
}));
// view prescription
app.get('/prescriptions/patient', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!connection) {
        console.log("Cannot connect to database");
    }
    const doctorId = req.query.doctorId.toString();
    const patientId = req.query.patientId.toString();
    const prescriptions = yield patient_get_prescription_1.default.execute(connection, parseInt(doctorId), parseInt(patientId));
    res.send(prescriptions);
}));
// get all meds in database
app.get('/get_med', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!connection) {
        console.log("Cannot connect to database");
    }
    const med = yield get_medicine_1.default.execute(connection);
    res.send(med);
}));
// view patient's profile
app.get('/profile', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!connection) {
        console.log("Cannot connect to database");
    }
    const patientId = req.query.patientId.toString();
    const patientInfo = yield get_patient_info_1.default.execute(connection, parseInt(patientId));
    res.send(patientInfo);
}));
// patient edits profile
app.post('/edit_profile', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
    yield edit_profile_1.default.execute(connection, parseInt(patientId), firstName, lastName, dob, sex, email, phone, address, notes);
    res.status(200).send("Edit success");
}));
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
