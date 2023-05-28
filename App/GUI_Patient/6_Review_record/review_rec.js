const recordURL = "http://localhost:8000/patient_view_record_history";
const refreshURL = "http://localhost:8000/refresh";
const authURL = "http://localhost:8000/auth";

const defaultOptions = {
  baseURL: "localhost:5500",
  withCredentials: true,
};
const instance = axios.create(defaultOptions);

$(document).ready(function () {
  if (
    sessionStorage.getItem("patientId") == null &&
    sessionStorage.getItem("doctorId") == null
  ) {
    window.location.replace("../../GUI_Doctor/1_Login_screen/sign_in.html");
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
  $(document).ready(async () => {
    try {
      let res = await instance.get(recordURL, {
        params: {
          patientId: sessionStorage.getItem("patientId"),
          doctorId: sessionStorage.getItem("doctorId"),
          presDate: sessionStorage.getItem("date"),
        },
      });
      var info = res.data.info;
      getInfo(info);
      var historyInfo = res.data.history;
      getHistory(historyInfo);
      var diagnosis_indication_med = res.data.prescription;
      getDiag_Indications_Med(diagnosis_indication_med);
    } catch (error) {
      console.log(error);
    }
  });

  //history info
  function getHistory(history) {
    if (history.length != 0) {
      var table = document.getElementById("history");
      for (i = 0; i < history.length; i++) {
        var row = table.insertRow(i + 1);

        // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);

        // Add some text to the new cells:
        cell1.innerHTML = history[i].prescriptionDate;
        cell2.innerHTML = history[i].diagnosis;
        cell3.innerHTML = history[i].doctorName;

        var rows = document.getElementsByTagName("tr");
        var href = "review_rec.html";
        var createClickHandler = function (row, doctorId, date) {
          return function () {
            sessionStorage.setItem("doctorId", doctorId);
            sessionStorage.setItem("date", date);
            window.location.replace(href);
          };
        };

        rows[i + 1].onclick = createClickHandler(
          rows[i + 1],
          history[i].doctorId,
          history[i].prescriptionDate
        );
      }
    }
  }
  
  //patient info
  function getInfo(info) {
    if (info.length != 0) {
      document.getElementById("lastName").innerHTML = info.lastName;
      document.getElementById("firstName").innerHTML = info.firstName;
      document.getElementById("dateOfBirth").innerHTML = info.dob;
      document.getElementById("sex").innerHTML = info.sex;
      document.getElementById("address").innerHTML = info.address;
      document.getElementById("notes").innerHTML = info.notes;
      document.getElementById("fullName").innerHTML =
        info.firstName + " " + info.lastName;
      document.getElementById("phone").innerHTML = info.phone;
    }
  }

  //patient diagnosis, indications and medications
  function getDiag_Indications_Med(presInfo) {
    if (presInfo.length != 0) {
      var table = document.getElementById("prescription");
      document.getElementById("diag").innerHTML = presInfo[0].diagnosis;
      document.getElementById("indication").innerHTML = presInfo[0].indications;
      for (let i = 0; i < presInfo.length; i++) {
        // Create an empty <tr> element and add it to the 1st position of the table:
        var row = table.insertRow(i + 1);

        // Insert new cells (<td> elements) to the "new" <tr> element:
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        table.rows[i + 1].cells[0].id = "drug";
        // Add some text to the new cells:
        cell1.innerHTML = presInfo[i].medName;
        cell2.innerHTML = presInfo[i].purpose;
        cell3.innerHTML = presInfo[i].dosage;
        cell4.innerHTML = presInfo[i].method;
        cell5.innerHTML = presInfo[i].time;
      }
    }
  }
}
