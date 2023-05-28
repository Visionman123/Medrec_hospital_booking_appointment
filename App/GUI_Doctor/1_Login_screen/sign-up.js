//URL settings
const signup = document.getElementById("btn-sign-up");
const signUpURL = "http://localhost:8000/signup";

const defaultOptions = {
  baseURL: "localhost:5500",
  withCredentials: true,
};

const instance = axios.create(defaultOptions);

//Fill all field
signup.onclick = () => {
  fillAllField();
};

function fillAllField() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const retypePassword = document.getElementById("retype-password").value;

  $("#username").keydown(() => {
    $("#username").removeClass("error");
  });
  $("#password").keydown(() => {
    $("#password").removeClass("error");
  });
  $("#retype-password").keydown(() => {
    $("#retype-password").removeClass("error");
  });

  if (
    username != "" &&
    password != "" &&
    retypePassword != "" &&
    password === retypePassword
  ) {
    processForm();
  } else {
    if (password != retypePassword) {
      $("#message").text("Passwords do not match");
      $("#password").addClass("error");
      $("#retype-password").addClass("error");
    }

    if (retypePassword === "") {
      $("#message").text("Please retype password");
      $("#retype-password").addClass("error");
    }

    if (password === "") {
      $("#message").text("Password is missing");
      $("#password").addClass("error");
    }

    if (password === "" && retypePassword === "") {
      $("#message").text("Passwords are missing");
    }

    if (username === "") {
      $("#message").text("Username is missing");
      $("#message").text("Username is missing");
      $("#username").addClass("error");
    }

    if (username === "" && password === "" && retypePassword === "") {
      $("#message").text("Please fill out all the fields");
      $("#username").addClass("error");
      $("#password").addClass("error");
      $("#retype-password").addClass("error");
    }
  }
}

//Compare username and password
function processForm() {
  let form = document.getElementById("sign-up");
  form.onsubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await instance.post(signUpURL, {
        username: form.username.value,
        password: form.password.value,
      });
      if (res.data === "Failure") {
        $("#message").text("Username already exists");
      } else {
        alert("Sign up successfully");
        window.location.replace("./sign_in.html");
      }
    } catch (error) {
      console.log(error);
    }
  };
}
