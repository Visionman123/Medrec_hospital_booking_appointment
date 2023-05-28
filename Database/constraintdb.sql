--
-- TOC entry 3415 (class 0 OID 0)
-- Dependencies: 217
-- Name: department_dep_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.department_dep_id_seq', 5, true);


--
-- TOC entry 3416 (class 0 OID 0)
-- Dependencies: 219
-- Name: doctor_doctor_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.doctor_doctor_id_seq', 1, true);


--
-- TOC entry 3417 (class 0 OID 0)
-- Dependencies: 222
-- Name: medicine_med_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.medicine_med_id_seq', 1, false);


--
-- TOC entry 3418 (class 0 OID 0)
-- Dependencies: 224
-- Name: patient_patient_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.patient_patient_id_seq', 1, false);


--
-- TOC entry 3419 (class 0 OID 0)
-- Dependencies: 227
-- Name: prescription_pres_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.prescription_pres_id_seq', 15, true);


--
-- TOC entry 3217 (class 2606 OID 17172)
-- Name: appointment appointment_doctor_id_patient_id_date_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.appointment
    ADD CONSTRAINT appointment_doctor_id_patient_id_date_key UNIQUE (doctor_id, patient_id, date);


--
-- TOC entry 3219 (class 2606 OID 17174)
-- Name: appointment appointment_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.appointment
    ADD CONSTRAINT appointment_pkey PRIMARY KEY (patient_id, date, "time");


--
-- TOC entry 3221 (class 2606 OID 17176)
-- Name: department department_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.department
    ADD CONSTRAINT department_pkey PRIMARY KEY (dep_id);


--
-- TOC entry 3223 (class 2606 OID 17178)
-- Name: doctor doctor_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.doctor
    ADD CONSTRAINT doctor_pkey PRIMARY KEY (doctor_id);


--
-- TOC entry 3225 (class 2606 OID 17180)
-- Name: hms_user hms_user_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hms_user
    ADD CONSTRAINT hms_user_pkey PRIMARY KEY (user_id);


--
-- TOC entry 3227 (class 2606 OID 17182)
-- Name: hms_user hms_user_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hms_user
    ADD CONSTRAINT hms_user_username_key UNIQUE (username);


--
-- TOC entry 3229 (class 2606 OID 17184)
-- Name: medicine medicine_medname_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.medicine
    ADD CONSTRAINT medicine_medname_key UNIQUE (medname);


--
-- TOC entry 3231 (class 2606 OID 17186)
-- Name: medicine medicine_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.medicine
    ADD CONSTRAINT medicine_pkey PRIMARY KEY (med_id);


--
-- TOC entry 3233 (class 2606 OID 17188)
-- Name: patient patient_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.patient
    ADD CONSTRAINT patient_pkey PRIMARY KEY (patient_id);


--
-- TOC entry 3235 (class 2606 OID 17190)
-- Name: pres_med pres_med_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pres_med
    ADD CONSTRAINT pres_med_pkey PRIMARY KEY (med_id, pres_id);


--
-- TOC entry 3237 (class 2606 OID 17192)
-- Name: prescription prescription_doctor_id_patient_id_presdate_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.prescription
    ADD CONSTRAINT prescription_doctor_id_patient_id_presdate_key UNIQUE (doctor_id, patient_id, presdate);


--
-- TOC entry 3239 (class 2606 OID 17194)
-- Name: prescription prescription_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.prescription
    ADD CONSTRAINT prescription_pkey PRIMARY KEY (pres_id);


--
-- TOC entry 3240 (class 2606 OID 17195)
-- Name: appointment appointment_doctor_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.appointment
    ADD CONSTRAINT appointment_doctor_id_fkey FOREIGN KEY (doctor_id) REFERENCES public.doctor(doctor_id) ON UPDATE CASCADE;


--
-- TOC entry 3241 (class 2606 OID 17200)
-- Name: appointment appointment_patient_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.appointment
    ADD CONSTRAINT appointment_patient_id_fkey FOREIGN KEY (patient_id) REFERENCES public.patient(patient_id) ON UPDATE CASCADE;


--
-- TOC entry 3242 (class 2606 OID 17205)
-- Name: doctor doctor_dep_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.doctor
    ADD CONSTRAINT doctor_dep_id_fkey FOREIGN KEY (dep_id) REFERENCES public.department(dep_id) ON UPDATE CASCADE;


--
-- TOC entry 3243 (class 2606 OID 17210)
-- Name: doctor doctor_doctor_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.doctor
    ADD CONSTRAINT doctor_doctor_id_fkey FOREIGN KEY (doctor_id) REFERENCES public.hms_user(user_id) ON UPDATE CASCADE;


--
-- TOC entry 3244 (class 2606 OID 17215)
-- Name: patient patient_patient_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.patient
    ADD CONSTRAINT patient_patient_id_fkey FOREIGN KEY (patient_id) REFERENCES public.hms_user(user_id) ON UPDATE CASCADE;


--
-- TOC entry 3245 (class 2606 OID 17220)
-- Name: pres_med pres_med_med_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pres_med
    ADD CONSTRAINT pres_med_med_id_fkey FOREIGN KEY (med_id) REFERENCES public.medicine(med_id) ON UPDATE CASCADE;


--
-- TOC entry 3246 (class 2606 OID 17225)
-- Name: pres_med pres_med_pres_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pres_med
    ADD CONSTRAINT pres_med_pres_id_fkey FOREIGN KEY (pres_id) REFERENCES public.prescription(pres_id) ON UPDATE CASCADE;


--
-- TOC entry 3247 (class 2606 OID 17230)
-- Name: prescription prescription_doctor_id_patient_id_presdate_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.prescription
    ADD CONSTRAINT prescription_doctor_id_patient_id_presdate_fkey FOREIGN KEY (doctor_id, patient_id, presdate) REFERENCES public.appointment(doctor_id, patient_id, date) ON UPDATE CASCADE;


-- Completed on 2023-05-19 09:48:33

--
-- PostgreSQL database dump complete
--
