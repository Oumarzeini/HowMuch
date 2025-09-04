import { IP_INFO_API_KEY, WEATHER_API_KEY } from "./supabase.js";
import {
  toggleBioBtn,
  gettingNameAndEmail,
  setProfileImage,
  showEditProfilePage,
  setInfo,
} from "./profile_dom_functions.js";

const initApp = () => {
  if (!localStorage.getItem("customUserInfo")) {
    const customUserInfo = {
      profile_photo_url: null,
      full_name: null,
      location: null,
      bio: null,
    };
    localStorage.setItem("customUserInfo", JSON.stringify(customUserInfo));
  }

  const backArrow = document.getElementById("back_arrow");
  backArrow.onclick = () => {
    document.getElementById("edit_profile_model").classList.remove("show");
  };
  const editProfileForm = document.getElementById("edit_profile_form");
  editProfileForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const customUserInfo = JSON.parse(
      localStorage.getItem("customUserInfo") || "{}"
    );

    const newName = document.getElementById("full_name").value.trim();

    customUserInfo.full_name = newName;

    const newLocation = document.getElementById("location").value;

    customUserInfo.location = newLocation;

    const newBio = document.getElementById("bio").value.trim();
    customUserInfo.bio = newBio;

    localStorage.setItem("customUserInfo", JSON.stringify(customUserInfo));

    setInfo();
  });

  const submitProfileChangesBtn = document.getElementById(
    "submit_profile_changes_btn"
  );
  submitProfileChangesBtn.onclick = () => {
    document.getElementById("edit_profile_model").classList.remove("show");
  };

  //TRACKING PRODUCTS COUNT
  const stockProducts = JSON.parse(
    localStorage.getItem("stockProducts") || "[]"
  );
  const productsCount = document.getElementById("products_count");
  productsCount.textContent = stockProducts.length;

  // LOCATION FUNCTIONS
  const getLocationWithIpinfo = async () => {
    try {
      const res = await fetch(
        `https://ipinfo.io/json?token=${IP_INFO_API_KEY}`
      );
      const data = await res.json();
      const city = data.city;
      const region = data.region;
      const country = data.country;
      const savedLocation = JSON.parse(
        localStorage.getItem("userLocation") || "[]"
      );
      savedLocation.push(city, country);
      localStorage.setItem("userLocation", JSON.stringify(savedLocation));
      const locationText = document.getElementById("user_location");
      locationText.textContent = `${savedLocation[0]} , ${savedLocation[1]}`;
    } catch (err) {
      console.log(`Error : `, err.message);
    }
  };

  const getLocationWithOWM = async () => {
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
            const savedLocation = JSON.parse(
              localStorage.getItem("userLocation") || "[]"
            );
            savedLocation.push(city, country);
            localStorage.setItem("userLocation", JSON.stringify(savedLocation));
            const locationText = document.getElementById("user_location");
            locationText.textContent = `${savedLocation[0]} , ${savedLocation[1]}`;
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
        }
      });
    }
  };

  const getLocation = async () => {
    const savedLocation = JSON.parse(localStorage.getItem("userLocation"));

    if (savedLocation) {
      const locationText = document.getElementById("user_location");
      locationText.textContent = `${savedLocation[0]} , ${savedLocation[1]}`;
      return;
    } else {
      getLocationWithOWM();
    }
  };
  getLocation();

  // DOM FUNCTIONS
  toggleBioBtn();
  gettingNameAndEmail();
  setProfileImage();
  showEditProfilePage();
  setInfo();
};

document.addEventListener("DOMContentLoaded", () => {
  initApp();
});
