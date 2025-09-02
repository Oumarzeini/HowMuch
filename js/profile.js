import { supabase, IP_INFO_API_KEY, WEATHER_API_KEY } from "./supabase.js";

const displayLocation = () => {
  const locationText = document.getElementById("user_location");
  const locationInfo = JSON.parse(localStorage.getItem("locationInfo") || "[]");
  locationText.textContent = `${locationInfo[0]} , ${locationInfo[1]}`;
  localStorage.setItem("locationInfo", JSON.stringify(locationInfo));
};

displayLocation();

const gettingNameAndEmail = async () => {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    console.log("Error getting user : ", error);
    return;
  } else {
    const email = user.email;
    const emailInput = document.getElementById("email");
    emailInput.value = user.email;

    const name = document.getElementById("user_name");
    name.textContent = email.split("@")[0];
  }
};

gettingNameAndEmail();

const getLocationWithIpinfo = async () => {
  try {
    const res = await fetch(`https://ipinfo.io/json?token=${IP_INFO_API_KEY}`);
    const data = await res.json();
    const city = data.city;
    const region = data.region;
    const country = data.country;
    const locationInfo = JSON.parse(
      localStorage.getItem("locationInfo") || "[]"
    );
    locationInfo.push(city, country);
    localStorage.setItem("locationInfo", JSON.stringify(locationInfo));
  } catch (err) {
    const locationText = document.getElementById("user_location");
    console.log(`Error : `, err.message);
    locationText.textContent = "Couldn't get location";
  }
};

const getUserLocation = async () => {
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
          const locationInfo = JSON.parse(
            localStorage.getItem("locationInfo") || "[]"
          );
          locationInfo.push(city, country);
          localStorage.setItem("locationInfo", JSON.stringify(locationInfo));
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

//getUserLocation();

const profilePhotoInput = document.getElementById("profile_photo");
const profileImage = document.getElementById("profile_img");
profilePhotoInput.addEventListener("change", (e) => {
  if (e.target.files.length > 0) {
    const file = e.target.files[0];
    const prviewImg = document.getElementById("preview_img");
    prviewImg.src = URL.createObjectURL(file);
    profileImage.src = prviewImg.src;
  }
});
