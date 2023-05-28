//URL setting
const makeAppointmentURL = "http://localhost:8000/make_appointment";
const departmentsURL = "http://localhost:8000/departments";
const doctorsURL = "http://localhost:8000/doctors";
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
  const makeApp = document.getElementById("btn-make-app");
  let doctors;
  var filteredDoctors;

  getDepartments();
  getDoctors();
  filterDoctors();
  date();
  getBookedPeriod();

  //Get department from database
  function getDepartments() {
    $(document).ready(async () => {
      try {
        let res = await axios.get(departmentsURL);
        if (res.data.length != 0) {
          var department = res.data;
          var showDepartment = document.getElementById("department");

          for (i = 0; i < department.length; i++) {
            var option = document.createElement("option");
            option.text = department[i];
            showDepartment.add(option);
          }
        }
      } catch (error) {
        console.log(error);
      }
    });
  }

  //Get all doctors
  function getDoctors() {
    $(document).ready(async () => {
      try {
        let res = await axios.get(doctorsURL);
        if (res.data.length != 0) {
          doctors = res.data;
        }
      } catch (error) {
        console.log(error);
      }
    });
  }

  //Get doctors from department
  function filterDoctors() {
    var showDoctor = document.getElementById("doctor");
    var departments = document.getElementById("department");

    departments.onchange = () => {
      var selectedDep = departments.options[departments.selectedIndex].text;
      filteredDoctors = doctors.filter(
        (doctor) => doctor.department === selectedDep
      );
      $("#doctor").empty();
      for (i = 0; i < filteredDoctors.length; i++) {
        var option = document.createElement("option");
        option.text = filteredDoctors[i].name;
        option.value = filteredDoctors[i].id;
        showDoctor.add(option);
      }
      return filteredDoctors;
    };
  }

  //Get available date
  function date() {
    $(document).ready(async () => {
      var dtToday = new Date();
      var month = dtToday.getMonth() + 1;
      var day = dtToday.getDate();
      var year = dtToday.getFullYear();
      if (month < 10) month = "0" + month.toString();
      if (day < 10) day = "0" + day.toString();
      var minDate = year + "-" + month + "-" + day;
      $("#date").attr("min", minDate);
    });
  }

  //Get booked schedule
  function getBookedPeriod() {
    try {
      var showDoctor = document.getElementById("doctor");
      var selectDate;
      var selectedDocBP;

      showDoctor.onchange = () => {
        document.getElementById("date").value = ""
        selectedDocBP = filteredDoctors[showDoctor.selectedIndex].bookedPeriods;
      };

      document.getElementById("date").onchange = () => {
        if (selectedDocBP != null) {
          selectDate = new Date($("#date").val()).toLocaleDateString();
          const filteredDocBP = selectedDocBP.filter(
            (selectedDocBP) => selectedDocBP.date === selectDate
          );

          var enbBtn = Array.from(document.getElementsByName("time"));
          for (i = 0; i < document.getElementsByName("time").length; i++) {
            enbBtn[i].disabled = false;
          }

          //disable all past time
          const today = new Date().toLocaleDateString();
          const hour = new Date().getHours();
          const minute = new Date().getMinutes();
          for (i = 0; i < document.getElementsByName("time").length; i++) {
            var timebtn = document.getElementsByName("time")[i].value;
            timeslice = timebtn.split(":");
            if (today == selectDate) {
              if (
                timeslice[0] < hour ||
                (timeslice[0] == hour && timeslice[1] <= minute)
              ) {
                enbBtn[i].disabled = true;
              }
            }
          }
          for (i = 0; i < filteredDocBP.length; i++) {
            var disBtn = Array.from(document.getElementsByName("time")).find(
              (radioBtn) => radioBtn.value === filteredDocBP[i].time
            );
            disBtn.disabled = true;
          }
        } else {
          $("#message").text("Please select Department and Doctor");
        }
      };
    } catch (error) {
      console.log(error);
    }
  }

  makeApp.onclick = () => {
    var departments = document.getElementById("department");
    var selectedDep = departments.options[departments.selectedIndex].text;

    var showDoctor = document.getElementById("doctor");
    var selectedDoc = showDoctor.options[showDoctor.selectedIndex].value;

    var selectDate = new Date($("#date").val()).toLocaleDateString();

    var time = document.querySelector('input[name="time"]:checked');

    if (
      selectedDoc === "Doctor" ||
      selectedDep === "Department" ||
      selectDate == "Invalid Date" ||
      time == null
    ) {
      $("#message").text("Please select all information");
    } else {
      function makeAppointment() {
        $(document).ready(async () => {
          try {
            let res = await instance.post(makeAppointmentURL, {
              patientId: sessionStorage.getItem("patientId"),
              doctorId: selectedDoc,
              date: selectDate,
              time: time.value,
            });
            alert(res.data);
            window.location.replace("../4_Review_appointment/review.html");
          } catch (error) {
            console.log(error);
          }
        });
      }
      makeAppointment();
    }
  };
}
