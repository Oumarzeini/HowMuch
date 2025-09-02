const renderProducts = () => {
  const productsList = document.getElementById("products_list");
  const products = JSON.parse(localStorage.getItem("products") || "[]");

  productsList.innerHTML = "";
  products.forEach((product) => {
    const productContainer = document.createElement("div");
    const productDiv = document.createElement("div");
    const pricesContainer = document.createElement("ul");
    const productName = document.createElement("p");
    const editsContainer = document.createElement("div");
    const updateBtn = document.createElement("button");
    const shareBtn = document.createElement("button");
    const deleteBtn = document.createElement("button");

    Object.values(product.units).forEach((unit) => {
      const unitLi = document.createElement("li");
      unitLi.textContent = unit;
      unitLi.classList.add("price");
      pricesContainer.append(unitLi);
    });

    productContainer.classList.add("product_container");
    productContainer.dataset.index = product?.id;
    productDiv.classList.add("product_div");
    pricesContainer.classList.add("product_units");
    productName.classList.add("product_name");
    editsContainer.classList.add("edits_container");
    updateBtn.classList.add("update");
    updateBtn.classList.add("edit_btns");
    deleteBtn.classList.add("delete");
    deleteBtn.classList.add("edit_btns");
    shareBtn.classList.add("share");
    shareBtn.classList.add("edit_btns");

    productName.textContent = product.product_name;
    updateBtn.innerHTML = `<svg
                class="edit_svgs"
                xmlns="http://www.w3.org/2000/svg"
                width="100"
                height="100"
                viewBox="0 0 1025 1023"
                fill="#000000"
              >
                <path
                  fill="#000000"
                  d="M896.428 1023h-768q-53 0-90.5-37.5T.428 895V127q0-53 37.5-90t90.5-37h576l-128 127h-384q-27 0-45.5 19t-18.5 45v640q0 27 19 45.5t45 18.5h640q27 0 45.5-18.5t18.5-45.5V447l128-128v576q0 53-37.5 90.5t-90.5 37.5zm-576-464l144 144l-208 64zm208 96l-160-159l479-480q17-16 40.5-16t40.5 16l79 80q16 16 16.5 39.5t-16.5 40.5z"
                />
              </svg>
              <p>Update</p> `;
    shareBtn.innerHTML = ` <svg
                class="edit_svgs"
                xmlns="http://www.w3.org/2000/svg"
                width="200"
                height="200"
                viewBox="0 0 24 24"
                fill="#000000"
              >
                <path
                  fill="none"
                  stroke="#000000"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 12a3 3 0 1 0 6 0a3 3 0 1 0-6 0m12-6a3 3 0 1 0 6 0a3 3 0 1 0-6 0m0 12a3 3 0 1 0 6 0a3 3 0 1 0-6 0m-6.3-7.3l6.6-3.4m-6.6 6l6.6 3.4"
                />
              </svg>
              <p>Share</p> `;
    deleteBtn.innerHTML = ` <svg
                class="edit_svgs"
                xmlns="http://www.w3.org/2000/svg"
                width="200"
                height="200"
                viewBox="0 0 24 24"
                fill="#000000"
              >
                <path
                  fill="#000000"
                  d="M18 19a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V7H4V4h4.5l1-1h4l1 1H19v3h-1v12M6 7v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2V7H6m12-1V5h-4l-1-1h-3L9 5H5v1h13M8 9h1v10H8V9m6 0h1v10h-1V9Z"
                />
              </svg>
              <p>Delete</p> `;

    updateBtn.onclick = () => {
      updateProduct(product.id);
    };
    deleteBtn.onclick = () => {
      deleteProduct(product.id);
    };

    editsContainer.append(updateBtn, shareBtn, deleteBtn);
    productDiv.append(productName, pricesContainer);
    productContainer.append(productDiv, editsContainer);
    productsList.prepend(productContainer);
  });
};
renderProducts();

const search = () => {
  const form = document.getElementById("search_form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
  });

  const searchInput = document.getElementById("search");
  searchInput.addEventListener("input", () => {
    const productsList = document.getElementById("products_list");
    const products = JSON.parse(localStorage.getItem("products") || "[]");
    productsList.innerHTML = "";
    const searchItem = searchInput.value.trim();
    const filteredProducts = products.filter(
      (product) =>
        product.product_name
          ?.toLowerCase()
          .includes(searchItem.toLowerCase()) ||
        Object.values(product.units || {}).some((value) => {
          return value.toLowerCase().includes(searchItem.toLowerCase());
        })
    );

    filteredProducts.forEach((product, index) => {
      const productContainer = document.createElement("div");
      const productDiv = document.createElement("div");
      const pricesContainer = document.createElement("ul");
      const productName = document.createElement("p");
      const editsContainer = document.createElement("div");
      const updateBtn = document.createElement("button");
      const shareBtn = document.createElement("button");
      const deleteBtn = document.createElement("button");

      Object.values(product.units).forEach((unit) => {
        const unitLi = document.createElement("li");
        unitLi.textContent = unit;
        unitLi.classList.add("price");
        pricesContainer.append(unitLi);
      });

      productContainer.classList.add("product_container");
      productDiv.classList.add("product_div");
      pricesContainer.classList.add("product_units");
      productName.classList.add("product_name");
      editsContainer.classList.add("edits_container");
      updateBtn.classList.add("update");
      updateBtn.classList.add("edit_btns");
      deleteBtn.classList.add("delete");
      deleteBtn.classList.add("edit_btns");
      shareBtn.classList.add("share");
      shareBtn.classList.add("edit_btns");
      productName.textContent = product.product_name;
      updateBtn.innerHTML = `<svg
                class="edit_svgs"
                xmlns="http://www.w3.org/2000/svg"
                width="100"
                height="100"
                viewBox="0 0 1025 1023"
                fill="#000000"
              >
                <path
                  fill="#000000"
                  d="M896.428 1023h-768q-53 0-90.5-37.5T.428 895V127q0-53 37.5-90t90.5-37h576l-128 127h-384q-27 0-45.5 19t-18.5 45v640q0 27 19 45.5t45 18.5h640q27 0 45.5-18.5t18.5-45.5V447l128-128v576q0 53-37.5 90.5t-90.5 37.5zm-576-464l144 144l-208 64zm208 96l-160-159l479-480q17-16 40.5-16t40.5 16l79 80q16 16 16.5 39.5t-16.5 40.5z"
                />
              </svg>
              <p>Update</p> `;
      shareBtn.innerHTML = ` <svg
                class="edit_svgs"
                xmlns="http://www.w3.org/2000/svg"
                width="200"
                height="200"
                viewBox="0 0 24 24"
                fill="#000000"
              >
                <path
                  fill="none"
                  stroke="#000000"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 12a3 3 0 1 0 6 0a3 3 0 1 0-6 0m12-6a3 3 0 1 0 6 0a3 3 0 1 0-6 0m0 12a3 3 0 1 0 6 0a3 3 0 1 0-6 0m-6.3-7.3l6.6-3.4m-6.6 6l6.6 3.4"
                />
              </svg>
              <p>Share</p> `;
      deleteBtn.innerHTML = ` <svg
                class="edit_svgs"
                xmlns="http://www.w3.org/2000/svg"
                width="200"
                height="200"
                viewBox="0 0 24 24"
                fill="#000000"
              >
                <path
                  fill="#000000"
                  d="M18 19a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V7H4V4h4.5l1-1h4l1 1H19v3h-1v12M6 7v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2V7H6m12-1V5h-4l-1-1h-3L9 5H5v1h13M8 9h1v10H8V9m6 0h1v10h-1V9Z"
                />
              </svg>
              <p>Delete</p> `;

      editsContainer.append(updateBtn, shareBtn, deleteBtn);
      productDiv.append(productName, pricesContainer);
      productContainer.append(productDiv, editsContainer);
      productsList.prepend(productContainer);
    });
  });
};

search();

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
  const form = document.getElementById("update_form");
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
  input.dataset.unitKey = unitName;

  inputAndLabelDiv.append(label, input);
  form.append(inputAndLabelDiv);

  overlay.style.display = "none";
  model.style.display = "none";
  body.classList.remove("no_scroll");
  unitName = "";
});

const updateProduct = (id) => {
  const updateModel = document.getElementById("updateModel");
  updateModel.style.display = "block";

  const form = document.getElementById("update_form");
  form.innerHTML = "";

  const products = JSON.parse(localStorage.getItem("products") || "[]");
  const productArray = products.filter((product) => product.id === id);
  const product = productArray[0];
  console.log(product);
  const units = product.units;

  const inputLabelDiv = document.createElement("div");
  inputLabelDiv.classList.add("input_label_div");
  const nameLabel = document.createElement("label");
  nameLabel.textContent = "Product Name";
  const nameInput = document.createElement("input");
  nameInput.value = product.product_name;
  nameInput.id = "update_product_name";
  nameInput.required = true;
  nameInput.maxLength = "15";

  inputLabelDiv.append(nameLabel, nameInput);
  form.append(inputLabelDiv);

  for (let unitKey in units) {
    const UnitsinputLabelDiv = document.createElement("div");
    UnitsinputLabelDiv.classList.add("input_label_div");

    const label = document.createElement("label");
    label.textContent = unitKey;

    const input = document.createElement("input");
    input.value = units[unitKey].split(":")[1].trim();
    input.dataset.unitKey = unitKey;
    input.maxLength = "20";

    UnitsinputLabelDiv.append(label, input);
    form.append(UnitsinputLabelDiv);
  }

  const saveUpdateBtn = document.getElementById("save_update_btn");
  saveUpdateBtn.onclick = () => {
    const newName = document.getElementById("update_product_name").value.trim();

    if (newName === "") {
      showWarning("name should not be empty!");
      return;
    }

    product.product_name = newName || product.product_name;

    const unitInputs = form.querySelectorAll("input[data-unit-key]");
    let hasOneValue = false;

    unitInputs.forEach((input) => {
      const key = input.dataset.unitKey;
      const value = input.value.trim();
      if (value === "") {
        delete product.units[key];
      } else {
        product.units[key] = `${key} : ${value}`;
        hasOneValue = true;
      }
    });

    if (!hasOneValue) {
      showWarning("Add at least one unit");
      return;
    }
    products[product] = product;

    localStorage.setItem("products", JSON.stringify(products));

    updateModel.style.display = "none";
    renderProducts();
  };
};

const cancelBtn = document.getElementById("cancel_btn");
cancelBtn.onclick = () => {
  const form = document.getElementById("update_form");
  form.innerHTML = "";
  updateModel.style.display = "none";
};

const deleteProduct = (id) => {
  const products = JSON.parse(localStorage.getItem("products") || "[]");
  const productIndex = products.findIndex((p) => p.id === id);

  const deleteModel = document.getElementById("delete_model");
  const deleteBtn = document.getElementById("delete");
  const cancelDeleteBtn = document.getElementById("cancel_delete");
  const overlay = document.getElementById("overlay");
  const body = document.body;

  deleteModel.style.display = "inline-flex";
  overlay.style.display = "block";
  body.classList.add("no_scroll");

  cancelDeleteBtn.onclick = () => {
    body.classList.remove("no_scroll");
    overlay.style.display = "none";
    deleteModel.style.display = "none";
    return;
  };

  deleteBtn.onclick = () => {
    products.splice(productIndex, 1);

    body.classList.remove("no_scroll");
    overlay.style.display = "none";
    deleteModel.style.display = "none";
    localStorage.setItem("products", JSON.stringify(products));
    renderProducts();
  };
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
