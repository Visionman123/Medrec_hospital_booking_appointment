//URL setting
const remaining_scheduleURL = "http://localhost:8000/remaining_schedule";
const finished_scheduleURL = "http://localhost:8000/finished_schedule";
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
    window.location.replace("../1_Login_screen/sign_in.html");
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
  //Info
  const greeting = document.getElementById("greetings");
  const notify = document.getElementById("notification");
  const calendar = document.getElementById("calendar");
  const logout = document.getElementById("btn-logout");
  const upcomingApp = document.getElementById("upcoming-app");
  const pastApp = document.getElementById("past-app");

  var upcoming;
  var past;

  //Function
  schedule();

  //Get data from database
  //Incoming Appointment
  function schedule() {
    $(document).ready(async () => {
      try {
        let res = await instance.get(remaining_scheduleURL, {
          params: {
            doctorId: sessionStorage.getItem("doctorId"),
          },
        });
        if (res.data.length != 0) {
          upcoming = res.data;
        }
        //greetings
        function greetings() {
          greeting.innerHTML = "Good day, Doctor";
          notify.innerHTML =
            "It is my pleasure to bring to your attention the presence of  " +
            upcoming.length +
            " individual(s) who eagerly anticipate your professional care and guidance!";
        }
        function startPage() {
          upcomingApp.checked = true;
          var href = "../3_Patient_rec/patient_rec.html";
          workCalendar(upcoming, href);
        }

        greetings();
        startPage();
        
      } catch (error) {
        console.log(error);
      }

      //Past Appointment
      try {
        let res = await instance.get(finished_scheduleURL, {
          params: {
            doctorId: sessionStorage.getItem("doctorId"),
          },
        });
        if (res.data.length != 0) {
          past = res.data;
        }
      } catch (error) {
        console.log(error);
      }
    });
  }

  //Work Calendar
  function workCalendar(schedule, href) {
    $("td").remove();
    if (schedule.length != undefined) {
      for (i = 0; i < schedule.length; i++) {
        var row = calendar.insertRow(i + 1);

        // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
        var appointment = row.insertCell(0);
        var patientName = row.insertCell(1);

        // Add some text to the new cells:
        appointment.innerHTML = schedule[i].time.slice(0, 5);
        var elLink = document.createElement("a");
        elLink.href = href;
        elLink.innerHTML = schedule[i].patient.name;
        elLink.id = schedule[i].patient.id;
        patientName.append(elLink);

        $(patientName).on("click", function () {
          var patientId = this.getElementsByTagName("a")[0].id;
          sessionStorage.setItem("patientId", patientId);
          sessionStorage.setItem("date", new Date().toLocaleDateString());
        });
      }
    }
  }

  //Change incoming and past schedule
  upcomingApp.onclick = () => {
    var href = "../3_Patient_rec/patient_rec.html";
    workCalendar(upcoming, href);
  };

  pastApp.onclick = () => {
    var href = "../3_Patient_rec/patient_rec_old.html";
    workCalendar(past, href);
  };


  //Logout
  logout.onclick = () => {
    logoutApp();
  };

  function logoutApp() {
    location.replace("../1_Login_screen/sign_in.html");
    sessionStorage.clear();
  }
}
