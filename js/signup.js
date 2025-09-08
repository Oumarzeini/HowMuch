import { supabase } from "./supabase.js";

const main = document.getElementById("main");
if (window.innerWidth > 768) {
  main.classList.add("main");
  main.innerHTML = `
        <div class="signup_div">
        <form id="form">
          <div class="email_div">
            <label for="email">Email</label>
            <input id="email" type="email" placeholder="name@example.com" required />
          </div>

          <div class="password_div">
            <label for="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" id="submit_btn">Sign In</button>
        </form>

        <div class="bottom_div">
          <button id="to_signup_btn">Sign Up</button>

          <p id="forgot_password">Forgot Password ?</p>
        </div>
      </div>

      <div class="logo_div">
        <img class="first_logo_image" src="images/logo_with_bg.jpg" alt="logo image" />
        <p class="motto">HowMuch , Traders never been happier...</p>
      </div>
  `;
  const signUpBtn = document.getElementById("to_signup_btn");
  signUpBtn.onclick = () => {
    if (signUpBtn.textContent === "Sign Up") {
      signUpBtn.textContent = "Sign In";
      submitBtn.textContent = "Sign Up";

      document.getElementById("forgot_password").style.display = "none";
      const nameDiv = document.getElementById("full_name_div");

      if (!nameDiv) {
        const form = document.getElementById("form");

        const nameDiv = document.createElement("div");
        nameDiv.classList.add("full_name_div");
        nameDiv.id = "full_name_div";

        const nameLabel = document.createElement("label");
        nameLabel.htmlFor = "full_name";
        nameLabel.textContent = "Full Name";
        //nameLabel.style.marginBottom = "10px";

        const fullName = document.createElement("input");
        fullName.id = "full_name";
        fullName.type = "text";
        fullName.placeholder = "ex. Med Ali";
        fullName.required = true;

        nameDiv.append(nameLabel, fullName);
        form.prepend(nameDiv);
      }
    } else {
      const nameDiv = document.getElementById("full_name_div");
      if (nameDiv) {
        nameDiv.remove();
      }

      document.getElementById("forgot_password").style.display = "block";

      signUpBtn.textContent = "Sign Up";
      submitBtn.textContent = "Sign In";
    }
  };

  const feedback = document.getElementById("feedback");
  const feedbackMessage = document.getElementById("feedback_message");
  const submitBtn = document.getElementById("submit_btn");
  const closeFeedback = document.getElementById("close_feedback");

  closeFeedback.onclick = () => {
    feedback.classList.remove("show");
  };

  const form = document.getElementById("form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    submitBtn.textContent === "Sign In"
      ? signIn(email, password)
      : signUp(email, password);
  });

  const signUp = async (email, password) => {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) {
      console.log("Error signing up", error);
      feedback.classList.add("show");
      feedbackMessage.innerHTML = `${error.message}. <svg class="feedback_icon" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="#ff0000"><g id="feWarning0" fill="none" fill-rule="evenodd" stroke="none" stroke-width="1"><g id="feWarning1" fill="#ff0000" fill-rule="nonzero"><path id="feWarning2" d="M12 20a8 8 0 1 0 0-16a8 8 0 0 0 0 16Zm0 2C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10Zm-1-6h2v2h-2v-2Zm0-10h2v8h-2V6Z"/></g></g></svg>`;
      return;
    } else {
      console.log("signed up successfully.");
      feedback.classList.add("show");
      feedbackMessage.innerHTML = `<p>Please check your email for a verification link and sign in.</p> <svg class="feedback_icon" xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 24 24" fill="#028a00"><path fill="none" stroke="#028a00" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0zM12 9v4m0 4h.01"/></svg>`;
    }
  };

  const signIn = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      console.log("error signing in", error);
      feedback.classList.add("show");
      feedbackMessage.innerHTML = `${error.message}. <svg class="feedback_icon" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="#ff0000"><g id="feWarning0" fill="none" fill-rule="evenodd" stroke="none" stroke-width="1"><g id="feWarning1" fill="#ff0000" fill-rule="nonzero"><path id="feWarning2" d="M12 20a8 8 0 1 0 0-16a8 8 0 0 0 0 16Zm0 2C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10Zm-1-6h2v2h-2v-2Zm0-10h2v8h-2V6Z"/></g></g></svg>`;
    } else {
      console.log("signed in successfully");
      window.location.href = "home.html";
    }
  };
} else {
  main.innerHTML = `

  <div class="top_div"> 
  <img class="logo_image" src="images/logo.png" alt="logo image" />

    <p class="caption">
      HowMuch , Traders never been <span class="hightlight">happier...</span>
    </p>

    </div>

    <div class="down_div">

    <button id="to_signup_btn" class="sign_up">Sign Up</button>
    <button id="to_signin_btn" class="sign_in">Sign In</button>

    </div>

<div id="model" class="model">
      <form id="form">
        <div class="email_div">
          <label for="email">Email</label>
          <input id="email" type="email" placeholder="Omarkam@example.com" required/>
        </div>

        <div class="password_div">
          <label for="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            required
          />
        </div>

        <button type="submit" id="submit_btn">  </button>
       
      </form>

      <div id="forgot_password_div" class="bottom_div">
        <p>Forgot Password ?</p>
      </div>

      <button id="close_model" class="close_model">Close</button>
    </div>
  `;

  const closeFeedback = document.getElementById("close_feedback");
  closeFeedback.onclick = () => {
    feedback.classList.remove("show");
  };

  const closeModel = document.getElementById("close_model");
  closeModel.onclick = () => {
    const model = document.getElementById("model");
    model.classList.remove("show_model");
    document.body.classList.remove("no_scroll");
  };

  const toSignUp = document.getElementById("to_signup_btn");
  const toSignIn = document.getElementById("to_signin_btn");

  toSignUp.onclick = () => {
    const model = document.getElementById("model");
    model.classList.add("show_model");
    const submitBtn = document.getElementById("submit_btn");
    submitBtn.textContent = "Sign Up";

    document.body.classList.add("no_scroll");

    document.getElementById("forgot_password_div").style.display = "none";

    const nameDiv = document.getElementById("full_name_div");

    if (!nameDiv) {
      const form = document.getElementById("form");

      const nameDiv = document.createElement("div");
      nameDiv.classList.add("full_name_div");
      nameDiv.id = "full_name_div";

      const nameLabel = document.createElement("label");
      nameLabel.htmlFor = "full_name";
      nameLabel.textContent = "Full Name";
      //nameLabel.style.marginBottom = "10px";

      const fullName = document.createElement("input");
      fullName.id = "full_name";
      fullName.type = "text";
      fullName.placeholder = "ex. Med Ali";
      fullName.required = true;

      nameDiv.append(nameLabel, fullName);
      form.prepend(nameDiv);
    }
  };

  toSignIn.onclick = () => {
    const model = document.getElementById("model");
    model.classList.add("show_model");
    document.body.classList.add("no_scroll");

    const submitBtn = document.getElementById("submit_btn");
    submitBtn.textContent = "Sign In";
    submitBtn.style.marginTop = "1rem";

    document.getElementById("forgot_password_div").style.display = "block";

    const nameDiv = document.getElementById("full_name_div");
    if (nameDiv) {
      nameDiv.remove();
    }
  };
}

const feedback = document.getElementById("feedback");

const feedbackMessage = document.getElementById("feedback_message");

const form = document.getElementById("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const submitBtn = document.getElementById("submit_btn");
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  submitBtn.textContent === "Sign In"
    ? signIn(email, password)
    : signUp(email, password);
});

const signUp = async (email, password) => {
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) {
    console.log("Error signing up", error);
    feedback.classList.add("show");
    feedbackMessage.innerHTML = `${error.message}. <svg class="feedback_icon" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="#ff0000"><g id="feWarning0" fill="none" fill-rule="evenodd" stroke="none" stroke-width="1"><g id="feWarning1" fill="#ff0000" fill-rule="nonzero"><path id="feWarning2" d="M12 20a8 8 0 1 0 0-16a8 8 0 0 0 0 16Zm0 2C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10Zm-1-6h2v2h-2v-2Zm0-10h2v8h-2V6Z"/></g></g></svg>`;
    return;
  } else {
    console.log("signed up successfully.");
    feedback.classList.add("show");
    feedbackMessage.innerHTML = `<p>Please check your email for a verification link and sign in.</p> <svg class="feedback_icon" xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 24 24" fill="#028a00"><path fill="none" stroke="#028a00" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0zM12 9v4m0 4h.01"/></svg>`;
    const userName = document.getElementById("full_name").value.trim();
    localStorage.setItem("userName", JSON.stringify(userName));
    //console.log(JSON.parse(localStorage.getItem("userName")));
  }
};

const signIn = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    console.log("error signing in", error);
    feedback.classList.add("show");
    feedbackMessage.innerHTML = `${error.message}. <svg class="feedback_icon" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="#ff0000"><g id="feWarning0" fill="none" fill-rule="evenodd" stroke="none" stroke-width="1"><g id="feWarning1" fill="#ff0000" fill-rule="nonzero"><path id="feWarning2" d="M12 20a8 8 0 1 0 0-16a8 8 0 0 0 0 16Zm0 2C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10Zm-1-6h2v2h-2v-2Zm0-10h2v8h-2V6Z"/></g></g></svg>`;
  } else {
    console.log("signed in successfully");
    window.location.href = "home.html";
  }
};
