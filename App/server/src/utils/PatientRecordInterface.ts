import PatientInfo from "./PatientInfoInterface";
import Prescription from "./PrescriptionInterface";
import HistoryInfo from "./HistoryInterface";
export default interface PatientRecord {
    info: PatientInfo;
    history: HistoryInfo[];
    prescription: Prescription[];
}