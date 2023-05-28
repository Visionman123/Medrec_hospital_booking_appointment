DROP DATABASE IF EXISTS hmsdb;
CREATE DATABASE hmsdb;
use hmsdb;

DROP TABLE IF EXISTS user;
CREATE TABLE user (
	user_id INT PRIMARY KEY,
	password VARCHAR(100),
    auth_token VARCHAR(255),
    generate_at INT,
    expire_at INT
    -- for simplicity, lets assume 3 is for doctor role, 1 is patient
);

DROP TABLE IF EXISTS DOCTOR;
CREATE TABLE DOCTOR(
	doctor_id INTEGER PRIMARY KEY AUTO_INCREMENT,
	first_name VARCHAR(20) NOT NULL,
	last_name VARCHAR(50) NOT NULL,
	sex VARCHAR(6) NOT NULL,
    department VARCHAR(20) NOT NULL,
	phone VARCHAR(20) default 'Hospital Number',
	email VARCHAR(40) default 'Hospital Email',
	DoB DATE NOT NULL,
    FOREIGN KEY(doctor_id) REFERENCES user(user_id)
    ON UPDATE cascade ON DELETE no action,
	unique(phone),
	unique(email),
	check(sex = "Male" OR sex = "Female" OR sex = "Other")
);

DROP TABLE IF EXISTS PATIENT;
CREATE TABLE PATIENT(
	patient_id INTEGER PRIMARY KEY,
	first_name VARCHAR(20) NOT NULL,
	last_name VARCHAR(50) NOT NULL,
	sex VARCHAR(6) NOT NULL,
	phone VARCHAR(20) NOT NULL,
	email VARCHAR(40) NOT NULL,
	DoB DATE NOT NULL,
	address VARCHAR(100),
    city VARCHAR(30),
	FOREIGN KEY(patient_id) REFERENCES user(user_id)
    ON UPDATE cascade ON DELETE no action,
	check(sex = "Male" OR sex = "Female" OR sex = "Other")
);

DROP TABLE IF EXISTS MEDICINE;
CREATE TABLE MEDICINE(
	med_id INTEGER PRIMARY KEY,
	medName VARCHAR(30) NOT NULL,
	quantity INTEGER DEFAULT 0
);

DROP TABLE IF EXISTS APPOINTMENT;
CREATE TABLE APPOINTMENT(
	doctor_id INTEGER,
	patient_id INTEGER,
	date DATE NOT NULL,
	time TIME NOT NULL,
	room INTEGER NOT NULL,
	PRIMARY KEY(doctor_id, patient_id, date),
	FOREIGN KEY(doctor_id) REFERENCES DOCTOR(doctor_id)
	ON DELETE no action ON UPDATE cascade,
	FOREIGN KEY(patient_id) REFERENCES PATIENT(patient_id)
	ON DELETE no action ON UPDATE cascade
);

DROP TABLE IF EXISTS PRESCRIPTION;
CREATE TABLE PRESCRIPTION(
	pres_id INTEGER PRIMARY KEY,
	doctor_id INTEGER NOT NULL,
	patient_id INTEGER NOT NULL,
	presDate DATE NOT NULL,
	diagnosis VARCHAR(30) NOT NULL,
	FOREIGN KEY(doctor_id, patient_id, presDate) REFERENCES APPOINTMENT(doctor_id, patient_id, date)
	ON DELETE no action ON UPDATE cascade
);

DROP TABLE IF EXISTS PRES_MED;
CREATE TABLE PRES_MED(
	med_id INTEGER,
	pres_id INTEGER,
	PRIMARY KEY(med_id, pres_id),
	FOREIGN KEY(med_id) REFERENCES MEDICINE(med_id)
	ON DELETE no action ON UPDATE cascade,
	FOREIGN KEY(pres_id) REFERENCES PRESCRIPTION(pres_id)
	ON DELETE no action ON UPDATE cascade
);


DELETE FROM user;
INSERT INTO user (user_id, password) VALUES 
(30000,'aaa'),
(10000,'abc123');

INSERT INTO patient (patient_id,first_name,last_name,sex,phone,email,doB,address,city)
VALUES
  (10000,"Nam","Nguyen Hoang","Other","(027) 2443 5560","blackburngraiden3485@google.ca","1971/2/2","Ap #227-8030 Suspendisse Ave","Fraserburgh");

INSERT INTO doctor (doctor_id,first_name,last_name,sex,department,phone,email,doB)
VALUES
  (30000,"Ngoc","Pham Nhu","Female","Emergency","0841 337 7752","nhungoc@aol.edu","1979/1/30");