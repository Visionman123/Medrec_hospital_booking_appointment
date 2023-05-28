const authURL = "http://localhost:8000/auth";
const refreshURL = "http://localhost:8000/refresh";
const patientProfileURL = "http://localhost:8000/profile";
const defaultOptions = {
  baseURL: "localhost:5500",
  withCredentials: true,
};
const instance = axios.create(defaultOptions);

function runPage() {
  var patientInfoStatus = getPatientInfo(); // check if this patient has info in database

  const laterBtn = document.getElementById("laterBtn");
  const nowBtn = document.getElementById("nowBtn");
  const nodeList = document.querySelectorAll("section");
  const alertBtn = document.getElementById("alert");

  $(".validate-info").on("click", function (e) {
    e.preventDefault();
    const validate = async () => {
      const rs = await patientInfoStatus;
      if (rs === "Profile filled") {
        window.location.assign(this.href);
      } else if (rs === "Profile not filled") {
        alert();
      }
    }
    validate();
  });

  nowBtn.onclick = () => {
    window.location.assign("../7_Set_information/set-information.html");
  };

  laterBtn.onclick = () => {
    alertBtn.style.visibility = "hidden";
    $("body").css("overflow", "visible");
    for (let i = 0; i < nodeList.length; i++) {
      nodeList[i].style.filter = "none";
    }
  };

  function alert() {
    if (alertBtn.style.visibility === "hidden") {
      alertBtn.style.visibility = "visible";
      $("body").css("overflow", "hidden");
      for (let i = 0; i < nodeList.length; i++) {
        nodeList[i].style.filter = "blur(5px)";
      }
    } else {
      alertBtn.style.visibility = "hidden";
      $("body").css("overflow", "visible");
      for (let i = 0; i < nodeList.length; i++) {
        nodeList[i].style.filter = "none";
      }
    }
  }
  async function getPatientInfo() {
    // e.preventDefault();
    try {
      let res = await instance.get(patientProfileURL, {
        params: { patientId: sessionStorage.getItem("patientId") },
      });
      if (res.data.length != 0) {
        info = res.data;
        if (
          info.firstName === "" ||
          info.lastName === "" ||
          info.email === "" ||
          info.dob === "" ||
          info.sexName === "" ||
          info.address === "" ||
          info.phoneName === ""
        ) {
          return "Profile not filled";
        } else {
          return "Profile filled";
        }
      } else {
        return "Profile not filled";
      }
    } catch (error) {
      console.log(error);
    }
  }
}

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
        // console.log("Refresh successful");
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

(function () {
  "use strict";

  const select = (el, all = false) => {
    el = el.trim();
    try {
      if (all) {
        return [...document.querySelectorAll(el)];
      } else {
        return document.querySelector(el);
      }
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * Event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all);
    if (selectEl) {
      if (all) {
        selectEl.forEach((e) => e.addEventListener(type, listener));
      } else {
        selectEl.addEventListener(type, listener);
      }
    }
  };

  /**
   * On scroll event listener
   */
  const onscroll = (el, listener) => {
    el.addEventListener("scroll", listener);
  };

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select("#navbar .scrollto", true);
  const navbarlinksActive = () => {
    let position = window.scrollY + 200;
    navbarlinks.forEach((navbarlink) => {
      if (!navbarlink.hash) return;
      let section = select(navbarlink.hash);
      if (!section) return;
      if (
        position >= section.offsetTop &&
        position <= section.offsetTop + section.offsetHeight
      ) {
        navbarlink.classList.add("active");
      } else {
        navbarlink.classList.remove("active");
      }
    });
  };
  window.addEventListener("load", navbarlinksActive);
  onscroll(document, navbarlinksActive);
  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select("#header");
    let offset = header.offsetHeight;

    let elementPos = select(el).offsetTop;
    window.scrollTo({
      top: elementPos - offset,
      behavior: "smooth",
    });
  };

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select("#header");
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add("header-scrolled");
      } else {
        selectHeader.classList.remove("header-scrolled");
      }
    };
    window.addEventListener("load", headerScrolled);
    onscroll(document, headerScrolled);
  }

  /**
   * Back to top button
   */
  let backtotop = select(".back-to-top");
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add("active");
      } else {
        backtotop.classList.remove("active");
      }
    };
    window.addEventListener("load", toggleBacktotop);
    onscroll(document, toggleBacktotop);
  }

  /**
   * Mobile nav toggle
   */
  on("click", ".mobile-nav-toggle", function (e) {
    select("#navbar").classList.toggle("navbar-mobile");
    this.classList.toggle("bi-list");
    this.classList.toggle("bi-x");
  });

  /**
   * Mobile nav dropdowns activate
   */
  on(
    "click",
    ".navbar .dropdown > a",
    function (e) {
      if (select("#navbar").classList.contains("navbar-mobile")) {
        e.preventDefault();
        this.nextElementSibling.classList.toggle("dropdown-active");
      }
    },
    true
  );


  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener("load", () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash);
      }
    }
  });

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener("load", () => {
    let portfolioContainer = select(".portfolio-container");
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: ".portfolio-item",
        layoutMode: "fitRows",
      });

      let portfolioFilters = select("#portfolio-flters li", true);

      on(
        "click",
        "#portfolio-flters li",
        function (e) {
          e.preventDefault();
          portfolioFilters.forEach(function (el) {
            el.classList.remove("filter-active");
          });
          this.classList.add("filter-active");

          portfolioIsotope.arrange({
            filter: this.getAttribute("data-filter"),
          });
          portfolioIsotope.on("arrangeComplete", function () {
            AOS.refresh();
          });
        },
        true
      );
    }
  });

  /**
   * Initiate portfolio lightbox
   */
  const portfolioLightbox = GLightbox({
    selector: ".portfolio-lightbox",
  });

  /**
   * Portfolio details slider
   */
  new Swiper(".portfolio-details-slider", {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
      clickable: true,
    },
  });

  /**
   * Testimonials slider
   */
  new Swiper(".testimonials-slider", {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    slidesPerView: "auto",
    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
      clickable: true,
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20,
      },

      1200: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
    },
  });

  /**
   * Animation on scroll
   */
  window.addEventListener("load", () => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();
})();
