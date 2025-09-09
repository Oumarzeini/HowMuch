import { supabase, IP_INFO_API_KEY, WEATHER_API_KEY } from "./supabase.js";

const initApp = () => {
  //DOM FUNCTIONS

  const body = document.body;
  const previewImg = document.getElementById("preview_img");
  const customUserInfo = JSON.parse(
    localStorage.getItem("customUserInfo") || "{}"
  );
  if (!customUserInfo.profile_photo_url) {
    const deleteBtn = document.getElementById("delete_profile_photo");
    deleteBtn.style.display = "none";
  }

  previewImg.src =
    customUserInfo?.profile_photo_url || "images/profileImage.jpg";

  //Add the option to close the settings inside of the settins

  const gettingEmail = async () => {
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
    }
  };

  const setEditProfilePage = () => {
    const customUserInfo = JSON.parse(
      localStorage.getItem("customUserInfo") || "{}"
    );

    const currentName = document.getElementById("full_name");
    currentName.value = customUserInfo.full_name;

    const currentLocation = document.getElementById("location");
    currentLocation.value = customUserInfo.location;

    const newBio = document.getElementById("bio");
    if (customUserInfo.bio) {
      newBio.value = customUserInfo.bio;
    } else {
      newBio.value = "";
    }
  };

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

          localStorage.setItem(
            "customUserInfo",
            JSON.stringify(customUserInfo)
          );
          previewImg.src = customUserInfo.profile_photo_url;
        };

        reader.readAsDataURL(photo);
        profilePhotoInput.value = "";
        document.getElementById("delete_profile_photo").style.display = "block";
      }
    });
  };

  const deleteProfilePhoto = () => {
    const deleteBtn = document.getElementById("delete_profile_photo");
    const deleteModel = document.getElementById("delete_model");
    const confirmDeleteBtn = document.getElementById("delete");
    const cancelDeleteBtn = document.getElementById("cancel_delete");
    const overlay = document.getElementById("overlay");
    const body = document.body;
    deleteBtn.onclick = () => {
      deleteModel.style.display = "inline-flex";
      overlay.style.display = "block";
      body.classList.add("no_scroll");

      confirmDeleteBtn.onclick = () => {
        const customUserInfo = JSON.parse(
          localStorage.getItem("customUserInfo") || "{}"
        );

        customUserInfo.profile_photo_url = null;
        localStorage.setItem("customUserInfo", JSON.stringify(customUserInfo));

        deleteModel.style.display = "none";
        overlay.style.display = "none";
        body.classList.remove("no_scroll");
        deleteBtn.style.display = "none";
        window.location.reload();
      };

      cancelDeleteBtn.onclick = () => {
        deleteModel.style.display = "none";
        overlay.style.display = "none";
        body.classList.remove("no_scroll");
      };
    };
  };

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

  const autoSelectLocation = document.getElementById("auto_select_location");
  autoSelectLocation.onclick = () => {
    getLocationWithOWM();
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
  });

  const submitProfileChangesBtn = document.getElementById(
    "submit_profile_changes_btn"
  );

  submitProfileChangesBtn.onclick = () => {
    document.getElementById(
      "show_loader_model"
    ).innerHTML = `<p>Saving Changes...</p>
      <svg
        class="model_loader"
        xmlns="http://www.w3.org/2000/svg"
        width="200"
        height="200"
        viewBox="0 0 24 24"
        fill="#000000"
      >
        <path
          fill="none"
          stroke="#000000"
          stroke-dasharray="15"
          stroke-dashoffset="15"
          stroke-linecap="round"
          stroke-width="2"
          d="M12 3C16.9706 3 21 7.02944 21 12"
        >
          <animate
            fill="freeze"
            attributeName="stroke-dashoffset"
            dur="0.3s"
            values="15;0"
          />
          <animateTransform
            attributeName="transform"
            dur="1.5s"
            repeatCount="indefinite"
            type="rotate"
            values="0 12 12;360 12 12"
          />
        </path>
      </svg>`;

    document.getElementById("show_loader_model").style.display = "inline-flex";
    document.getElementById("overlay").style.display = "block";

    setTimeout(() => {
      document.getElementById(
        "show_loader_model"
      ).innerHTML = `<p> Saved </p> <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 24 24"><path fill="green" d="M18.7 7.2c-.4-.4-1-.4-1.4 0l-7.5 7.5l-3.1-3.1c-.4-.4-1-.4-1.4 0c-.4.4-.4 1 0 1.4l3.8 3.8c.2.2.4.3.7.3c.3 0 .5-.1.7-.3l8.2-8.2c.4-.4.4-1 0-1.4z"/></svg>`;

      setTimeout(() => {
        document.getElementById("show_loader_model").style.display = "none";
        document.getElementById("overlay").style.display = "none";
      }, 1000);
    }, 1500);

    // setTimeout(() => {
    //   document.getElementById("show_loader_model").style.display = "none";
    //   document.getElementById("overlay").style.display = "none";
    // }, 1500);
  };

  //TRACKING PRODUCTS COUNT

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

      document.getElementById("location").value = customUserInfo.location;
    } catch (err) {
      console.log(`ipInfp Error : `, err.message);
    } finally {
      loader.style.display = "none";
    }
  };

  const getLocationWithOWM = async () => {
    const loader = document.getElementById("loader");

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        try {
          loader.style.display = "block";
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
            document.getElementById("location").value = customUserInfo.location;
          } else {
            console.log("No city found calling ipInfo fallback");
            getLocationWithIpinfo();
          }
        } catch (err) {
          console.log(
            `Error : ${err.message} fetching location , calling ipInfo callback`
          );
          getLocationWithIpinfo();
        } finally {
          loader.style.display = "none";
        }
      });
    }
  };

  gettingEmail();
  setProfileImage();
  setEditProfilePage();
  deleteProfilePhoto();
};

document.addEventListener("DOMcontentLoaded", initApp());
