//URL settings
const recordURL = "http://localhost:8000/patient_view_all_records";
const refreshURL = "http://localhost:8000/refresh";
const authURL = "http://localhost:8000/auth";

const defaultOptions = {
  baseURL: "localhost:5500",
  withCredentials: true,
};

const instance = axios.create(defaultOptions);

$(document).ready(function () {
  if (sessionStorage.getItem("patientId") == null
  && sessionStorage.getItem("doctorId") == null) {
   window.location.replace("../../GUI_Doctor/1_Login_screen/sign_in.html")
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
      window.location.replace("../../GUI_Doctor/1_Login_screen/sign_in.html")
    }
  } catch (error) {
    console.log(error);
  }
}


function runPage() {
  $(document).ready(async () => {
    try {
      let res = await instance.get(recordURL, {
        params: { patientId: sessionStorage.getItem("patientId") },
      });
      if (res.data.length != 0) {
        var history = res.data;
        var table = document.getElementById("pat-record");
        for (i = 0; i < history.length; i++) {
          var row = table.insertRow(i + 1);

          // Insert new cells (<td> elements) to the "new" <tr> element:
          var cell1 = row.insertCell(0);
          var cell2 = row.insertCell(1);
          var cell3 = row.insertCell(2);

          // Add some text to the new cells:
          cell1.innerHTML = history[i].prescriptionDate;
          cell2.innerHTML = history[i].diagnosis;
          cell3.innerHTML = history[i].doctorName;

          var rows = document.getElementsByTagName("tr");
          var href = "../6_Review_record/review_rec.html";
          var createClickHandler = function (row, doctorId, date) {
            return function () {
              sessionStorage.setItem("doctorId", doctorId);
              sessionStorage.setItem("date", date);
              window.location.assign(href)
            };
          };

          rows[i + 1].onclick = createClickHandler(
            rows[i + 1],
            history[i].doctorId,
            history[i].prescriptionDate
          );
        }
      }
    } catch (error) {
      console.log(error);
    }
  });
}
