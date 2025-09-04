import { supabase } from "./supabase.js";

const userName = document.getElementById("user_name");
const userLocation = document.getElementById("user_location");
const userBio = document.getElementById("user_bio");
const profileImage = document.getElementById("profile_img");
const previewImg = document.getElementById("preview_img");
profileImage.src = previewImg.src;

export const toggleBioBtn = () => {
  const customUserInfo = JSON.parse(
    localStorage.getItem("customUserInfo") || "{}"
  );

  if (customUserInfo.bio === "") {
    document.getElementById("add_bio_btn").style.display = "block";
  } else {
    document.getElementById("add_bio_btn").style.display = "none";
  }
};

export const gettingNameAndEmail = async () => {
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

export const setProfileImage = () => {
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

export const showEditProfilePage = () => {
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

export const setInfo = () => {
  if (localStorage.getItem("customUserInfo")) {
    const customUserInfo = JSON.parse(localStorage.getItem("customUserInfo"));

    previewImg.src = customUserInfo.profile_photo_url;
    profileImage.src = previewImg.src;
    userName.textContent = customUserInfo.full_name;
    userLocation.textContent = customUserInfo.location;
    userBio.textContent = customUserInfo.bio;
  }

  toggleBioBtn();
};
