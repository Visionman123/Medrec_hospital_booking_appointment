--
-- PostgreSQL database dump
--

-- Dumped from database version 15.2
-- Dumped by pg_dump version 15.2

-- Started on 2023-05-19 09:48:33

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE hmsdb;
--
-- TOC entry 3408 (class 1262 OID 17117)
-- Name: hmsdb; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE hmsdb WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1252';


ALTER DATABASE hmsdb OWNER TO postgres;

\connect hmsdb

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 2 (class 3079 OID 17118)
-- Name: adminpack; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS adminpack WITH SCHEMA pg_catalog;


--
-- TOC entry 3409 (class 0 OID 0)
-- Dependencies: 2
-- Name: EXTENSION adminpack; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION adminpack IS 'administrative functions for PostgreSQL';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 215 (class 1259 OID 17128)
-- Name: appointment; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.appointment (
    doctor_id integer NOT NULL,
    patient_id integer NOT NULL,
    date date NOT NULL,
    "time" time without time zone NOT NULL
);


ALTER TABLE public.appointment OWNER TO postgres;

--
-- TOC entry 216 (class 1259 OID 17131)
-- Name: department; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.department (
    dep_id integer NOT NULL,
    dep_name character varying(50)
);


ALTER TABLE public.department OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 17134)
-- Name: department_dep_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.department_dep_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.department_dep_id_seq OWNER TO postgres;

--
-- TOC entry 3410 (class 0 OID 0)
-- Dependencies: 217
-- Name: department_dep_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.department_dep_id_seq OWNED BY public.department.dep_id;


--
-- TOC entry 218 (class 1259 OID 17135)
-- Name: doctor; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.doctor (
    doctor_id integer NOT NULL,
    first_name character varying(20) NOT NULL,
    last_name character varying(50) NOT NULL,
    sex character varying(6) NOT NULL,
    phone character varying(20) DEFAULT 'Hospital Number'::character varying,
    email character varying(40) DEFAULT 'Hospital Email'::character varying,
    dob date NOT NULL,
    room integer,
    dep_id integer,
    CONSTRAINT doctor_sex_check CHECK ((((sex)::text = 'Male'::text) OR ((sex)::text = 'Female'::text)))
);


ALTER TABLE public.doctor OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 17141)
-- Name: doctor_doctor_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.doctor_doctor_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.doctor_doctor_id_seq OWNER TO postgres;

--
-- TOC entry 3411 (class 0 OID 0)
-- Dependencies: 219
-- Name: doctor_doctor_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.doctor_doctor_id_seq OWNED BY public.doctor.doctor_id;


--
-- TOC entry 220 (class 1259 OID 17142)
-- Name: hms_user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.hms_user (
    user_id integer NOT NULL,
    username character varying(50) NOT NULL,
    password character varying(100),
    auth_token character varying(255),
    generate_at integer,
    expire_at integer,
    ref_generate_at integer,
    ref_expire_at integer,
    ref_auth_token character varying(255)
);


ALTER TABLE public.hms_user OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 17147)
-- Name: medicine; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.medicine (
    med_id integer NOT NULL,
    medname character varying(100) NOT NULL,
    quantity integer DEFAULT 0
);


ALTER TABLE public.medicine OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 17151)
-- Name: medicine_med_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.medicine_med_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.medicine_med_id_seq OWNER TO postgres;

--
-- TOC entry 3412 (class 0 OID 0)
-- Dependencies: 222
-- Name: medicine_med_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.medicine_med_id_seq OWNED BY public.medicine.med_id;


--
-- TOC entry 223 (class 1259 OID 17152)
-- Name: patient; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.patient (
    patient_id integer NOT NULL,
    first_name character varying(200),
    last_name character varying(200),
    sex character varying(6),
    phone character varying(200),
    email character varying(200),
    dob date,
    address character varying(200),
    notes character varying(200),
    CONSTRAINT patient_sex_check CHECK ((((sex)::text = 'Male'::text) OR ((sex)::text = 'Female'::text) OR ((sex)::text = 'Other'::text)))
);


ALTER TABLE public.patient OWNER TO postgres;

--
-- TOC entry 224 (class 1259 OID 17158)
-- Name: patient_patient_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.patient_patient_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.patient_patient_id_seq OWNER TO postgres;

--
-- TOC entry 3413 (class 0 OID 0)
-- Dependencies: 224
-- Name: patient_patient_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.patient_patient_id_seq OWNED BY public.patient.patient_id;


--
-- TOC entry 225 (class 1259 OID 17159)
-- Name: pres_med; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.pres_med (
    med_id integer NOT NULL,
    pres_id integer NOT NULL,
    purpose character varying(50),
    dosage character varying(30),
    route character varying(30),
    frequency character varying(30)
);


ALTER TABLE public.pres_med OWNER TO postgres;

--
-- TOC entry 226 (class 1259 OID 17162)
-- Name: prescription; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.prescription (
    pres_id integer NOT NULL,
    doctor_id integer NOT NULL,
    patient_id integer NOT NULL,
    presdate date NOT NULL,
    indications character varying(200),
    diagnosis character varying(30) NOT NULL
);


ALTER TABLE public.prescription OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 17165)
-- Name: prescription_pres_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.prescription_pres_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.prescription_pres_id_seq OWNER TO postgres;

--
-- TOC entry 3414 (class 0 OID 0)
-- Dependencies: 227
-- Name: prescription_pres_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.prescription_pres_id_seq OWNED BY public.prescription.pres_id;


--
-- TOC entry 3206 (class 2604 OID 17166)
-- Name: department dep_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.department ALTER COLUMN dep_id SET DEFAULT nextval('public.department_dep_id_seq'::regclass);


--
-- TOC entry 3207 (class 2604 OID 17167)
-- Name: doctor doctor_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.doctor ALTER COLUMN doctor_id SET DEFAULT nextval('public.doctor_doctor_id_seq'::regclass);


--
-- TOC entry 3210 (class 2604 OID 17168)
-- Name: medicine med_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.medicine ALTER COLUMN med_id SET DEFAULT nextval('public.medicine_med_id_seq'::regclass);


--
-- TOC entry 3212 (class 2604 OID 17169)
-- Name: patient patient_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.patient ALTER COLUMN patient_id SET DEFAULT nextval('public.patient_patient_id_seq'::regclass);


--
-- TOC entry 3213 (class 2604 OID 17170)
-- Name: prescription pres_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.prescription ALTER COLUMN pres_id SET DEFAULT nextval('public.prescription_pres_id_seq'::regclass);
