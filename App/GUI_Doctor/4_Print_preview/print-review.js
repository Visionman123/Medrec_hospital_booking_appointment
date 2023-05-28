//URL setting
const getDoctorInfoURL = "http://localhost:8000/doctors";
const recordURL = "http://localhost:8000/patient_view_record_history";
const authURL = "http://localhost:8000/auth";
const refreshURL = "http://localhost:8000/refresh";

const defaultOptions = {
  baseURL: "localhost:5500",
  withCredentials: true,
};

const instance = axios.create(defaultOptions);

$(document).ready(function () {
  if (sessionStorage.getItem("patientId") == null
   && sessionStorage.getItem("doctorId") == null) {
    window.location.replace("../1_Login_screen/sign_in.html")
  }
  authorize();
  let count = sessionStorage.getItem("refTimeCount");
  const refreshInterval = setInterval(async () => {
    //refresh access token every 5 minutes
    if (count % (5*60) === 0 && count != 0) {
      let res = await instance.post(refreshURL);
      //refresh token expires
      if (res.data === "Failure") {
        clearInterval(refreshInterval);
      } else {
        console.log("Refresh successful");
      }
    }
    sessionStorage.setItem("refTimeCount", count++);
  }, 1000);
});

async function authorize() {
  // authorize
  try {
    let res = await instance.get(authURL);
    console.log(res.data);
    if (res.data === "Success") {
      runPage();
    } else {
      window.location.replace("../../GUI_Doctor/1_Login_screen/sign_in.html");
    }
  } catch (error) {
    console.log(error);
  }
}

function runPage() {
  const btnPrint = document.getElementById("btn-print");

  getPatientInfo();
  getDoctorInfo();

  //View patient information
  function getPatientInfo() {
    $(document).ready(async () => {
      try {
        let res = await instance.get(recordURL, {
          params: {
            patientId: sessionStorage.getItem("patientId"),
            doctorId: sessionStorage.getItem("doctorId"),
            presDate: sessionStorage.getItem("date"),
          },
        });
        const patient = res.data.info;
        if (patient.length != 0) {
          document.getElementById("tel").innerHTML = patient.phone;
          document.getElementById("name").innerHTML =
            patient.firstName + " " + patient.lastName;
          document.getElementById("add").innerHTML = patient.address;
          document.getElementById("sex").innerHTML = patient.sex;
          document.getElementById("dob").innerHTML = patient.dob;
        }

        const presInfo = res.data.prescription;
        if (presInfo.length != 0) {
          var table = document.getElementById("prescript-table");
          document.getElementById("diag").innerHTML = presInfo[0].diagnosis;
          for (let i = 0; i < presInfo.length; i++) {

            // Create an empty <tr> element and add it to the 1st position of the table:
            var row = table.insertRow(i + 1);

            // Insert new cells (<td> elements) to the "new" <tr> element:
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);
            var cell4 = row.insertCell(3);
            var cell5 = row.insertCell(4);
            var cell6 = row.insertCell(5);

            // Add some text to the new cells:
            cell1.innerHTML = i + 1;
            cell2.innerHTML = presInfo[i].medName;
            cell3.innerHTML = presInfo[i].purpose;
            cell4.innerHTML = presInfo[i].dosage;
            cell5.innerHTML = presInfo[i].method;
            cell6.innerHTML = presInfo[i].time;
          }
        }
      } catch (error) {
        console.log(error);
      }
    });
  }

  //View doctor information
  function getDoctorInfo() {
    $(document).ready(async () => {
      try {
        let res = await instance.get(getDoctorInfoURL, {
          params: { doctorId: sessionStorage.getItem("doctorId") },
        });

        if (res.data.length != 0) {
          doctor = res.data;
          var d = doctor.find(
            (doctor) => doctor.id == sessionStorage.getItem("doctorId")
          );
          document.getElementById("doc-name").innerHTML = d.name;
          document.getElementById("doc-tel").innerHTML = d.phone;
          document.getElementById("doc-email").innerHTML = d.email;
        }
      } catch (error) {
        console.log(error);
      }
    });
  }

  //Print and return to Homepage
  btnPrint.onclick = () => {
    print();
  };

  function print() {
    window.print();
    window.location.assign("../2_Doctor_homepage/doc_workCalendar.html");
  }
}
