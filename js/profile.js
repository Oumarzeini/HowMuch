import { supabase, IP_INFO_API_KEY, WEATHER_API_KEY } from "./supabase.js";

const initApp = () => {
  // FRIST CHECKS
  const customUserInfo = JSON.parse(
    localStorage.getItem("customUserInfo") || "{}"
  );

  if (!customUserInfo.full_name) {
    userName.textContent = JSON.parse(localStorage.getItem("userName"));
  }
  //DOM FUNCTIONS

  const body = document.body;
  const userName = document.getElementById("user_name");
  const userLocation = document.getElementById("user_location");
  const userBio = document.getElementById("user_bio");
  const profileImage = document.getElementById("profile_img");

  //Add the option to close the settings inside of the settins

  // const handleSettings = () => {
  //   const settingsIcon = document.getElementById("settings_icon");
  //   const settingsDropdown = document.getElementById("setting_dropdown");
  //   settingsIcon.onclick = () => {
  //     settingsDropdown.classList.toggle("show_settings");
  //     body.classList.toggle("no_scroll");
  //     overlay.style.display = "block";
  //     if (settingsDropdown.classList.contains("show_settings")) {
  //       overlay.onclick = () => {
  //         settingsDropdown.classList.toggle("show_settings");
  //         body.classList.toggle("no_scroll");
  //         overlay.style.display = "none";
  //       };
  //     }
  //   };
  // };

  //handleSettings();

  const toggleBioBtn = () => {
    const customUserInfo = JSON.parse(
      localStorage.getItem("customUserInfo") || "{}"
    );

    if (customUserInfo.bio === "") {
      document.getElementById("add_bio_btn").style.display = "block";
      document.getElementById("toggle_bio_btn").style.display = "none";
    } else {
      document.getElementById("add_bio_btn").style.display = "none";
      document.getElementById("toggle_bio_btn").style.display = "block";
    }
  };

  const setInfo = () => {
    if (localStorage.getItem("customUserInfo")) {
      const customUserInfo = JSON.parse(localStorage.getItem("customUserInfo"));

      userName.textContent = customUserInfo.full_name;
      userLocation.textContent = customUserInfo.location;
      userBio.textContent = customUserInfo.bio;
      if (customUserInfo.profile_photo_url) {
        profileImage.src = customUserInfo.profile_photo_url;
      } else {
        profileImage.src = "images/profileImage.jpg";
      }
    }

    toggleBioBtn();
  };

  // const rateTrader = () => {
  //   const firstStar = document.getElementById("first_star");
  //   const secondStar = document.getElementById("second_star");
  //   const thirdStar = document.getElementById("third_star");
  //   const fourthStar = document.getElementById("fourth_star");
  //   const fifthStar = document.getElementById("fifth_star");

  //   firstStar.onclick = () => {
  //     firstStar.classList.toggle("green");
  //     enableSubmitBtn();
  //   };

  //   secondStar.addEventListener("click", () => {
  //     if (firstStar.classList.contains("green")) {
  //       secondStar.classList.toggle("green");
  //       enableSubmitBtn();
  //       return;
  //     }
  //     secondStar.classList.toggle("green");
  //     firstStar.classList.toggle("green");
  //     enableSubmitBtn();
  //   });

  //   thirdStar.addEventListener("click", () => {
  //     if (secondStar.classList.contains("green")) {
  //       thirdStar.classList.toggle("green");
  //       enableSubmitBtn();
  //       return;
  //     }
  //     thirdStar.classList.toggle("green");
  //     firstStar.classList.toggle("green");
  //     secondStar.classList.toggle("green");
  //     enableSubmitBtn();
  //   });

  //   fourthStar.addEventListener("click", () => {
  //     if (thirdStar.classList.contains("green")) {
  //       fourthStar.classList.toggle("green");
  //       enableSubmitBtn();
  //       return;
  //     }
  //     fourthStar.classList.toggle("green");
  //     firstStar.classList.toggle("green");
  //     secondStar.classList.toggle("green");
  //     thirdStar.classList.toggle("green");
  //     enableSubmitBtn();
  //   });

  //   fifthStar.addEventListener("click", () => {
  //     if (fourthStar.classList.contains("green")) {
  //       fifthStar.classList.toggle("green");
  //       enableSubmitBtn();
  //       return;
  //     }
  //     fifthStar.classList.toggle("green");
  //     firstStar.classList.toggle("green");
  //     secondStar.classList.toggle("green");
  //     thirdStar.classList.toggle("green");
  //     fourthStar.classList.toggle("green");
  //     enableSubmitBtn();
  //   });
  // };

  let currentRating = 0;

  const rateTrader = () => {
    const stars = document.querySelectorAll(".stars");

    stars.forEach((star, index) => {
      star.addEventListener("click", () => {
        // If the clicked star is already green AND the next one is not green,
        // clear the rating
        if (
          star.classList.contains("green") &&
          (index === stars.length - 1 ||
            !stars[index + 1].classList.contains("green"))
        ) {
          stars.forEach((s) => s.classList.remove("green"));
          currentRating = 0;
        } else {
          // Otherwise, set rating up to clicked star
          stars.forEach((s) => s.classList.remove("green"));
          for (let i = 0; i <= index; i++) {
            stars[i].classList.add("green");
          }
          currentRating = index + 1; // rating is index+1
        }

        console.log("Current rating:", currentRating);
        enableSubmitBtn();
      });
    });
  };

  rateTrader();

  const submitRateBtn = document.getElementById("submit_rate");
  submitRateBtn.onclick = () => {
    overlay.style.display = "block";
    body.classList.add("no_scroll");
    document.getElementById("submit_rating_div").style.display = "inline-flex";
  };

  document.getElementById("close_submit_model").onclick = () => {
    document.getElementById("submit_rating_div").style.display = "none";
    overlay.style.display = "none";
    body.classList.remove("no_scroll");
  };

  const enableSubmitBtn = () => {
    if (currentRating > 0) {
      submitRateBtn.style.backgroundColor = "green";
      submitRateBtn.disabled = false;
    } else {
      submitRateBtn.style.backgroundColor = "";
      submitRateBtn.disabled = true;
    }
  };

  enableSubmitBtn();

  // UTILITY
  if (!localStorage.getItem("customUserInfo")) {
    const customUserInfo = {
      profile_photo_url: null,
      full_name: null,
      location: null,
      bio: null,
    };
    localStorage.setItem("customUserInfo", JSON.stringify(customUserInfo));
  }

  // expand bio text.
  const bioText = document.getElementById("user_bio");
  const expandBioBtn = document.getElementById("toggle_bio_btn");

  expandBioBtn.onclick = () => {
    bioText.classList.toggle("expand");
    bioText.classList.contains("expand")
      ? (expandBioBtn.textContent = "Read less")
      : (expandBioBtn.textContent = "Read more");
  };

  //TRACKING PRODUCTS COUNT
  const stockProducts = JSON.parse(
    localStorage.getItem("stockProducts") || "[]"
  );
  const productsCount = document.getElementById("products_count");
  productsCount.textContent = stockProducts.length;

  // LOCATION FUNCTIONS
  const getLocationWithIpinfo = async () => {
    const loader = document.getElementById("loader");
    try {
      loader.style.display = "block";
      const res = await fetch(
        `https://ipinfo.io/json?token=${IP_INFO_API_KEY}`
      );
      const data = await res.json();
      const city = data.city;
      //const region = data.region;
      const country = data.country;
      const customUserInfo = JSON.parse(
        localStorage.getItem("customUserInfo") || "{}"
      );
      customUserInfo.location = `${city} , ${country}`;
      localStorage.setItem("customUserInfo", JSON.stringify(customUserInfo));
      setInfo();
      document.getElementById("location").value = customUserInfo.location;
    } catch (err) {
      console.log(`Error : `, err.message);
    } finally {
      loader.style.display = "none";
    }
  };

  const getLocationWithOWM = async () => {
    const loader = document.getElementById("loader");

    loader.style.display = "block";

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        try {
          const res = await fetch(
            `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${WEATHER_API_KEY}`
          );

          const response = await res.json();
          if (response.length > 0) {
            const city = response[0].name;
            const country = response[0].country;
            const customUserInfo = JSON.parse(
              localStorage.getItem("customUserInfo") || "{}"
            );
            customUserInfo.location = `${city} , ${country}`;
            localStorage.setItem(
              "customUserInfo",
              JSON.stringify(customUserInfo)
            );
            setInfo();
            document.getElementById("location").value = customUserInfo.location;
          } else {
            console.log("No city found calling ipInfo fallback");
            getLocationWithIpinfo();
          }
        } catch (err) {
          console.log(
            "Error fetching location , calling ipInfo callback",
            err.message
          );
          getLocationWithIpinfo();
        } finally {
          loader.style.display = "none";
        }
      });
    }
  };

  const getLocation = async () => {
    const customUserInfo = JSON.parse(
      localStorage.getItem("customUserInfo") || "{}"
    );
    if (customUserInfo) {
      setInfo();
      return;
    } else {
      getLocationWithOWM();
    }
  };
  getLocation();

  toggleBioBtn();
  setInfo();
};

document.addEventListener("DOMContentLoaded", initApp());
