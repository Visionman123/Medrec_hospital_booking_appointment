//URL setting
const viewAppURL = "http://localhost:8000/appointments";
const authURL = "http://localhost:8000/auth";
const refreshURL = "http://localhost:8000/refresh";

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
  //View appointment
  appointment();

  function appointment() {
    $(document).ready(async () => {
      try {
        let res = await instance.get(viewAppURL, {
          params: { patientId: sessionStorage.getItem("patientId") },
        });
        if (res.data.length != 0) {
          var appointment = res.data;
          var table = document.getElementById("table-app");
          for (i = 1; i <= appointment.length; i++) {
            var row = table.insertRow(i);

            // Insert new cells (<td> elements) to the "new" <tr> element:
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);
            var cell4 = row.insertCell(3);

            // Add some text to the new cells:
            cell1.innerHTML = appointment[i - 1].doctorName;
            cell2.innerHTML = appointment[i - 1].date;
            cell3.innerHTML = appointment[i - 1].time;
            cell4.innerHTML = appointment[i - 1].room;
          }
        }
      } catch (error) {
        console.log(error);
      }
    });
  }
}
