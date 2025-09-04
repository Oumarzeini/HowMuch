import { supabase, IP_INFO_API_KEY, WEATHER_API_KEY } from "./supabase.js";

const userName = document.getElementById("user_name");
const userLocation = document.getElementById("user_location");
const userBio = document.getElementById("user_bio");
const profileImage = document.getElementById("profile_img");
const previewImg = document.getElementById("preview_img");
profileImage.src = previewImg.src;

if (!localStorage.getItem("customUserInfo")) {
  const customUserInfo = {
    profile_photo_url: null,
    full_name: null,
    location: null,
    bio: null,
  };
  localStorage.setItem("customUserInfo", JSON.stringify(customUserInfo));
}

const toggleBioBtn = () => {
  const customUserInfo = JSON.parse(
    localStorage.getItem("customUserInfo") || "{}"
  );

  if (customUserInfo.bio === "") {
    document.getElementById("add_bio_btn").style.display = "block";
  } else {
    document.getElementById("add_bio_btn").style.display = "none";
  }
};

toggleBioBtn();

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

    const customUserInfo = JSON.parse(
      localStorage.getItem("customUserInfo") || "{}"
    );

    if (!customUserInfo.full_name) {
      userName.textContent = JSON.parse(localStorage.getItem("userName"));
    }
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
    getUserLocation();
  }
};
getLocation();

const setProfileImage = () => {
  const profilePhotoInput = document.getElementById("profile_photo");

  profilePhotoInput.addEventListener("change", (e) => {
    if (e.target.files.length > 0) {
      const photo = e.target.files[0];
      const reader = new FileReader();

      reader.onload = (e) => {
        const base64Image = e.target.result;

        const customUserInfo = JSON.parse(
          localStorage.getItem("customUserInfo") || "{}"
        );
        customUserInfo.profile_photo_url = base64Image;

        previewImg.src = base64Image;

        profileImage.src = base64Image;

        localStorage.setItem("customUserInfo", JSON.stringify(customUserInfo));
      };

      reader.readAsDataURL(photo);
      profilePhotoInput.value = "";
    }
  });
};

setProfileImage();

const backArrow = document.getElementById("back_arrow");
backArrow.onclick = () => {
  document.getElementById("edit_profile_model").classList.remove("show");
};

const showEditProfilePage = () => {
  const addBioBtn = document.getElementById("add_bio_btn");
  addBioBtn.onclick = () => {
    document.getElementById("edit_profile_model").classList.add("show");
  };

  const editProfileBtn = document.getElementById("edit_profile_btn");
  editProfileBtn.onclick = () => {
    document.getElementById("edit_profile_model").classList.add("show");
  };

  const customUserInfo = JSON.parse(
    localStorage.getItem("customUserInfo") || "{}"
  );

  const currentName = document.getElementById("full_name");
  currentName.value = customUserInfo.full_name;

  const currentLocation = document.getElementById("location");
  currentLocation.value = customUserInfo.location;

  const newBio = document.getElementById("bio");
  const currentBio = document.getElementById("user_bio");
  if (customUserInfo.bio) {
    newBio.value = customUserInfo.bio;
  } else {
    newBio.value = "";
  }
};

showEditProfilePage();

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

const setInfo = () => {
  if (localStorage.getItem("customUserInfo")) {
    const customUserInfo = JSON.parse(localStorage.getItem("customUserInfo"));

    previewImg.src = customUserInfo.profile_photo_url;
    profileImage.src = previewImg.src;
    userName.textContent = customUserInfo.full_name;
    userLocation.textContent = customUserInfo.location;
    userBio.textContent = customUserInfo.bio;
  }
};

setInfo();

window.onload = () => {
  const customUserInfo = JSON.parse(
    localStorage.getItem("customUserInfo") || "{}"
  );
  if (customUserInfo.full_name) {
    // previewImg.src = customUserInfo.profile_photo_url;
    // profileImage.src = customUserInfo.profile_photo_url;
    console.log(customUserInfo.full_name);
    const name = document.getElementById("user_name");
    name.textContent = customUserInfo.full_name;
  }
};
