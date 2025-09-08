import { supabase, IP_INFO_API_KEY, WEATHER_API_KEY } from "./supabase.js";

const initApp = () => {
  //DOM FUNCTIONS

  const body = document.body;
  const userName = document.getElementById("user_name");
  const userLocation = document.getElementById("user_location");
  const userBio = document.getElementById("user_bio");
  const profileImage = document.getElementById("profile_img");
  const previewImg = document.getElementById("preview_img");
  profileImage.src = previewImg.src;

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

  const showEditProfilePage = () => {
    const addBioBtn = document.getElementById("add_bio_btn");
    addBioBtn.onclick = () => {
      document.getElementById("edit_profile_model").classList.add("show");
      document.getElementById("bio").focus();
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
    if (customUserInfo.bio) {
      newBio.value = customUserInfo.bio;
    } else {
      newBio.value = "";
    }
  };

  const setInfo = () => {
    if (localStorage.getItem("customUserInfo")) {
      const customUserInfo = JSON.parse(localStorage.getItem("customUserInfo"));

      userName.textContent = customUserInfo.full_name;
      userLocation.textContent = customUserInfo.location;
      userBio.textContent = customUserInfo.bio;
      if (customUserInfo.profile_photo_url) {
        previewImg.src = customUserInfo.profile_photo_url;
        profileImage.src = previewImg.src;
      } else {
        previewImg.src = "images/profileImage.jpg";
        profileImage.src = previewImg.src;
      }
    }

    toggleBioBtn();
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

          setInfo();
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
        setInfo();

        deleteModel.style.display = "none";
        overlay.style.display = "none";
        body.classList.remove("no_scroll");
        deleteBtn.style.display = "none";
      };

      cancelDeleteBtn.onclick = () => {
        deleteModel.style.display = "none";
        overlay.style.display = "none";
        body.classList.remove("no_scroll");
      };
    };
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

  const autoSelectLocation = document.getElementById("auto_select_location");
  autoSelectLocation.onclick = () => {
    getLocationWithOWM();
    setInfo();
  };

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
  gettingNameAndEmail();
  setProfileImage();
  showEditProfilePage();
  setInfo();
  deleteProfilePhoto();
};

document.addEventListener("DOMContentLoaded", initApp());
