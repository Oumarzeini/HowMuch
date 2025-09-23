import { supabase } from "./supabase.js";

const signOutDiv = document.getElementById("sign_out_div");
const signOutModel = document.getElementById("sign_out_model");
const overlay = document.getElementById("overlay");
signOutDiv.onclick = () => {
  signOutModel.style.display = "inline-flex";
  overlay.style.display = "block";
};

const signOutBtn = document.getElementById("sign_out");
signOutBtn.onclick = () => {
  signOutModel.style.display = "none";
  document.getElementById(
    "show_loader_model"
  ).innerHTML = `<p>Signing out...</p>
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
    signOut();
  }, 2000);
};

const cancelBtn = document.getElementById("cancel");
cancelBtn.onclick = () => {
  document.getElementById("sign_out_model").style.display = "none";
  document.getElementById("overlay").style.display = "none";
};

const signOut = async () => {
  const { error } = supabase.auth.signOut();
  if (error) {
    console.log(error);
  } else {
    window.location.href = "index.html";
  }
};
