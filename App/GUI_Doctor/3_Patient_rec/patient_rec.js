const recordURL = "http://localhost:8000/record";
const addinfoURL = "http://localhost:8000/add_information";
const addpresURL = "http://localhost:8000/add_prescription";
const getMedURL = "http://localhost:8000/get_med";
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
    if (count % (5 * 60) === 0 && count != 0) {
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
      window.location.replace("../1_Login_screen/sign_in.html");
    }
  } catch (error) {
    console.log(error);
  }
}
function runPage() {
  const save_btn = document.getElementById("save-btn");
  const add_btn = document.getElementById("add-btn");
  const del_btn = document.getElementById("del-btn");
  const print_btn = document.getElementById("print-btn");
  const logout = document.getElementById("btn-logout");

  sessionStorage.setItem("date", new Date().toLocaleDateString());
  getMedicine();

  //patient info
  function info(patientInfo) {
    if (patientInfo.length != 0) {
      document.getElementById("lastname").innerHTML = patientInfo.lastName;
      document.getElementById("firstname").innerHTML = patientInfo.firstName;
      document.getElementById("dateofbirth").innerHTML = patientInfo.dob;
      document.getElementById("sex").innerHTML = patientInfo.sex;
      document.getElementById("address").innerHTML = patientInfo.address;
      document.getElementById("notes").innerHTML = patientInfo.notes;
      document.getElementById("fullname").innerHTML =
        patientInfo.lastName + " " + patientInfo.firstName;
      document.getElementById("phone").innerHTML = patientInfo.phone;
    }
  }

  //patient history
  function func_history(patientHistory) {
    if (patientHistory.length != 0) {
      var table = document.getElementById("history");
      for (i = 0; i < patientHistory.length; i++) {
        var row = table.insertRow(i + 1);

        // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);

        // Add some text to the new cells:
        cell1.innerHTML = patientHistory[i].prescriptionDate;
        cell2.innerHTML = patientHistory[i].diagnosis;
        cell3.innerHTML = patientHistory[i].doctorName;

        var rows = document.getElementsByTagName("tr");

        var href = "patient_rec_old.html";
        var createClickHandler = function (row, date) {
          return function () {
            sessionStorage.setItem("date", date);
            window.location.assign(href);
          };
        };

        rows[i + 1].onclick = createClickHandler(
          rows[i + 1],
          patientHistory[i].prescriptionDate
        );
      }
    }
  }

  callPatientRecordPage();
  function callPatientRecordPage() {
    $(document).ready(async () => {
      // e.preventDefault();
      try {
        let res = await instance.get(recordURL, {
          params: { patientId: sessionStorage.getItem("patientId") },
        });
        var patientInfo = res.data.info;
        info(patientInfo);
        var historyInfo = res.data.history;
        func_history(historyInfo);
      } catch (error) {
        console.log(error);
      }
    });
  }

  var saveBtnPressed = false;
  //the user has already SAVED the record
  save_btn.onclick = () => {
    const inputFields = document.querySelectorAll("input");
    inputFields.forEach(function (field) {
      field.setAttribute("readonly", true);
    });
    var diagnosis = document.getElementById("diag");
    var indication = document.getElementById("indication");
    diagnosis.setAttribute("readonly", true);
    indication.setAttribute("readonly", true);
    save_btn.style.display = "none";
    add_btn.style.display = "none";
    del_btn.style.display = "none";
    alert("The patient record is saved!");
    saveBtnPressed = true;
    diagnosis_indication();
  };

  print_btn.onclick = () => {
    window.location.assign("../4_Print_preview/print-review.html");
  };

  window.onbeforeunload = function () {
    try {
      if (!saveBtnPressed) {
        return "Are you sure you want to exit this page?";
      }
    } catch (error) {}
  };

  function diagnosis_indication() {
    try {
      $(document).ready(async () => {
        let res = await instance.post(addinfoURL, {
          patientId: sessionStorage.getItem("patientId"),
          doctorId: sessionStorage.getItem("doctorId"),
          diagnosis: document.getElementById("diag").value,
          indication: document.getElementById("indication").value,
        });
        if (res.data != null) {
          include_med_instruction(res.data);
        }
      });

      // console.log(res);
    } catch (error) {
      console.log(error);
    }
  }

  function include_med_instruction(prescription_id) {
    try {
      $(document).ready(async () => {
        var table = document.getElementById("prescription");
        for (var i = 0; i < table.rows.length; i++) {
          //if the drugName is assigned, assume all other columns are, if not, none are assigned!
          if (document.getElementsByName("drug")[i] != undefined) {
            if (document.getElementsByName("drug")[i].value != "") {
              var drugName = document.getElementsByName("drug")[i].value;
              let res = await instance.post(addpresURL, {
                presId: prescription_id,
                inputMed: drugName,
                inputPurpose: document.getElementsByName("purpose")[i].value,
                inputDosage: document.getElementsByName("dosage")[i].value,
                inputRoute: document.getElementsByName("method")[i].value,
                inputFrequency: document.getElementsByName("time")[i].value,
              });
              if (res.data === "Insertion success") {
                // alert("The prescription has been saved successfully");
              }
            }
          }
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  function getMedicine() {
    $(document).ready(async () => {
      try {
        let res = await instance.get(getMedURL, {});
        if (res.data.length != 0) {
          drugName = res.data;
          runtypeAhead();
        } else {
        }
      } catch (error) {
        console.log(error);
      }
    });
  }

  function runtypeAhead() {
    //filter drugs that already prescribed above
    drugClass = document.getElementsByName("drug");
    var usedDrugArr = Array.prototype.slice
      .call(drugClass)
      .map(function (element) {
        return element.value;
      });
    var filterDrug = drugName.filter(item => !usedDrugArr.includes(item));
    $(".typeahead").typeahead({
      // data source
      source: filterDrug,

      // how many items to show
      items: 8,

      // default template
      menu: '<ul class="typeahead dropdown-menu" role="listbox"></ul>',
      item: '<li><a class="dropdown-item" href="#" role="option"></a></li>',
      headerHtml: '<li class="dropdown-header"></li>',
      headerDivider: '<li class="divider" role="separator"></li>',
      itemContentSelector: "a",

      // min length to trigger the suggestion list
      minLength: 1,

      // number of pixels the scrollable parent container scrolled down
      scrollHeight: 0,

      // auto selects the first item
      autoSelect: true,

      // callbacks
      afterSelect: $.noop,
      afterEmptySelect: $.noop,

      // adds an item to the end of the list
      addItem: false,

      // delay between lookups
      delay: 0,
    });
  }

  $(add_btn).on("click", function () {
    addRow();
  });
  function addRow() {
    var newRow =
      '<tr><td class="typeahead-cell" class="drug" id= "drug"><input class="typeahead" type="text" name="drug" ></td><td><input type="text" name="purpose"></td><td><input type="text" name="dosage"></td><td><input type="text" name="method"></td><td><input type="text" name="time"></td></tr>';
    $("#prescription tbody").append(newRow);
    runtypeAhead();
  }

  $(del_btn).on("click", function () {
    deleteRow();
  });
  function deleteRow() {
    var table = document.getElementById("prescription");
    if (table.rows.length > 1) table.deleteRow(-1);
  }

  logout.onclick = () => {
    logoutApp();
  };

  function logoutApp() {
    location.replace("../1_Login_screen/sign_in.html");
    sessionStorage.clear();
  }
}

var drugName = [];
