import { allProducts } from "./products.js";

const feedbackDiv = document.getElementById("feedback_div");

const addUnitField = document.getElementById("add_unit_field_btn");
const addUnit = document.getElementById("add_unit");
const cancelUnit = document.getElementById("cancel_unit");

const overlay = document.getElementById("overlay");
const model = document.getElementById("model");
const body = document.body;

addUnitField.addEventListener("click", (e) => {
  e.preventDefault();
  overlay.style.display = "block";
  model.style.display = "inline-flex";
  body.classList.add("no_scroll");
});

cancelUnit.onclick = () => {
  overlay.style.display = "none";
  model.style.display = "none";
  body.classList.remove("no_scroll");
};

addUnit.addEventListener("click", () => {
  const form = document.getElementById("form");
  const unitName = document.getElementById("new_unit_name").value.trim();
  if (unitName === "") {
    console.log("no info");
    return;
  }
  const inputAndLabelDiv = document.createElement("div");
  inputAndLabelDiv.classList.add("input_label_div");

  const label = document.createElement("label");
  label.textContent = unitName;
  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = "Add price...";
  input.classList.add("unit");
  input.dataset.unit = unitName;

  inputAndLabelDiv.append(label, input);
  form.append(inputAndLabelDiv);

  overlay.style.display = "none";
  model.style.display = "none";
  body.classList.remove("no_scroll");
});

const addProduct = () => {
  const form = document.getElementById("form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
  });

  let productName = document.getElementById("product_name").value.trim();
  let units = {};
  let hasAtLeastOneUnit = false;

  const fields = document.querySelectorAll(".unit");

  fields.forEach((field) => {
    const unitLabel = field.dataset.unit;
    const price = field.value.trim();

    if (price) {
      units[unitLabel] = `${unitLabel} : ${price}`;
      hasAtLeastOneUnit = true;
    }
  });

  if (!productName) {
    showWarning("Product Name is required !");
    return;
  }

  if (!hasAtLeastOneUnit) {
    showWarning("Please add at least 1 price.");
    return;
  }

  const product = {
    id: Date.now(),
    product_name: productName,
    units: units,
  };

  const products = JSON.parse(localStorage.getItem("products") || "[]");
  products.push(product);
  localStorage.setItem("products", JSON.stringify(products));

  document.getElementById("product_name").value = "";
  fields.forEach((field) => {
    field.value = "";
  });

  setTimeout(() => {
    showFeedback();
  }, 500);
};

const saveBtn = document.getElementById("save_product_btn");
saveBtn.onclick = () => {
  try {
    addProduct();
  } catch (err) {
    console.log(err.message);
  }
};

const showFeedback = () => {
  const feedbackMsg = document.getElementById("feedback_msg");
  feedbackDiv.classList.add("show_feedback");
  setTimeout(() => {
    feedbackDiv.style.width = "300px";
    feedbackDiv.style.transition = "all 0.3s linear";
    setTimeout(() => {
      feedbackMsg.classList.add("show_msg");
    }, 200);
  }, 500);
  setTimeout(() => {
    const feedbackMsg = document.getElementById("feedback_msg");
    feedbackDiv.classList.remove("animate_in");
    feedbackDiv.classList.add("animate_out");
    feedbackMsg.classList.remove("show_msg");
    feedbackDiv.style.width = "60px";
    setTimeout(() => {
      feedbackDiv.classList.remove("show_feedback");
    }, 500);
  }, 4000);
};

const showWarning = (message) => {
  const warningMsg = document.getElementById("warning_msg");
  warningMsg.textContent = message;
  const warningDiv = document.getElementById("warning_feedback_div");
  warningDiv.classList.add("show_feedback");
  setTimeout(() => {
    warningDiv.style.width = "300px";
    warningDiv.style.transition = "all 0.3s linear";
    setTimeout(() => {
      warningMsg.classList.add("show_msg");
    }, 300);
  }, 500);
  setTimeout(() => {
    warningDiv.classList.remove("animate_in");
    warningDiv.classList.add("animate_out");
    warningMsg.classList.remove("show_msg");
    warningDiv.style.width = "60px";
    setTimeout(() => {
      warningDiv.classList.remove("show_feedback");
    }, 500);
  }, 4000);
};
