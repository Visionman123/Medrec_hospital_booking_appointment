//URL setting
const profileURL = "http://localhost:8000/profile";
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
      window.location.replace(
        "../../../GUI_Doctor/1_Login_screen/sign_in.html"
      );
    }
  } catch (error) {
    console.log(error);
  }
}

//Run Page after authorized
function runPage() {
  const btnEdit = document.getElementById("btn-edit");

  getData();

  //Show information
  //Get data from database
  function getData() {
    $(document).ready(async () => {
      try {
        let res = await instance.get(profileURL, {
          params: { patientId: sessionStorage.getItem("patientId") },
        });

        if (res.data.length != 0) {
          var view = res.data;

          viewShow(view);
          greetings(view);
        }
      } catch (error) {
        console.log(error);
      }
    });
  }

  //Greetings
  function greetings(view) {
    var greeting = document.getElementById("patient-name");
    greeting.innerHTML = "Hi " + view.firstName + ",";
  }

  //Show profile
  function viewShow(view) {
    //Info
    var fname = document.getElementById("fname");
    var dob = document.getElementById("dob");
    var email = document.getElementById("email");
    var lname = document.getElementById("lname");
    var tel = document.getElementById("tel");
    var address = document.getElementById("address");
    var male = document.getElementById("male");
    var female = document.getElementById("female");
    var notes = document.getElementById("notes");

    date = new Date(view.dob);
    fname.value = view.firstName;
    dob.value = date.toLocaleDateString("en-CA");
    email.value = view.email;
    lname.value = view.lastName;
    address.value = view.address;
    tel.value = view.phone;
    notes.value = view.notes;

    if (view.sex == "Male") {
      male.checked = true;
      female.disabled = true;
    } else {
      female.checked = true;
      male.disabled = true;
    }
  }

  //Edit profile
  btnEdit.onclick = () => {
    edit();
  };

  function edit() {
    location.assign("../7_Set_information/set-information.html");
  }
}
