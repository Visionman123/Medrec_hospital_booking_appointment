//URL settings
const signInURL = "http://localhost:8000/signin";
const btnSignIn = document.getElementById("btn-sign-in");
const defaultOptions = {
  baseURL: "localhost:5500",
  withCredentials: true,
};

const instance = axios.create(defaultOptions);

//Clear storage if failed to authenticate
$(document).ready(function () {
  sessionStorage.clear();
});

btnSignIn.onclick = () => {
  //Fill all field
  fillAllField();
};

function fillAllField() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  $("#username").keydown(() => {
    $("#username").removeClass("error");
  });
  $("#password").keydown(() => {
    $("#password").removeClass("error");
  });

  if (username != "" && password != "") {
    processForm();
  } else {
    $("#message").text("Please fill all the fields");
    $("#username").addClass("error");
    $("#password").addClass("error");
  }
}

//Compare username and password
function processForm() {
  let form = document.getElementById("sign-in");
  form.onsubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await instance.post(signInURL, {
        username: form.username.value,
        password: form.password.value,
      });

      if (res.data === "Not Found") {
        alert("Incorrect username or password");
      } else {
        sessionStorage.setItem("refTimeCount", 0);
        if (res.data.userid.toString(10).charAt(0) === "1") {
          window.location.replace("../2_Doctor_homepage/doc_workCalendar.html");
          sessionStorage.setItem("doctorId", res.data.userid);
        } else {
          window.location.replace("../../GUI_Patient/2_Homepage/homepage.html");
          sessionStorage.setItem("patientId", res.data.userid);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
}
