const addProductModel = document.getElementById("addProductModel");
const addProductBtns = document.querySelectorAll(".add_product");

addProductBtns.forEach((btn) => {
  btn.onclick = () => {
    addProductModel.style.display = "block";
    document.getElementById("pro_name").focus();
  };
});

const cancelAddProductBtn = document.getElementById("cancel_add_pro");

cancelAddProductBtn.onclick = () => {
  addProductModel.style.display = "none";
};

const addProduct = () => {
  const form = document.getElementById("addProductModel");
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const proName = document.getElementById("pro_name").value.trim();
    const proUnit = document.getElementById("pro_unit").value.trim();
    let proCount = parseInt(
      document.getElementById("pro_count").value.trim(),
      10
    );

    const stockProducts = JSON.parse(
      localStorage.getItem("stockProducts") || "[]"
    );
    const product = {};
    product.productName = proName;
    product.unit = proUnit;
    product.count = proCount;
    if (proCount <= 60) {
      product.status = "Low Stock";
    } else if (proCount <= 200) {
      product.status = "Medium Stock";
    } else {
      product.status = "High Stock";
    }
    stockProducts.push(product);
    localStorage.setItem("stockProducts", JSON.stringify(stockProducts));
    form.style.display = "none";
    renderProducts();
  });
};

addProduct();

const renderProducts = () => {
  const stockProducts = JSON.parse(
    localStorage.getItem("stockProducts") || "[]"
  );
  const productsList = document.getElementById("products_list");

  productsList.innerHTML = "";
  stockProducts.forEach((product, index) => {
    const updateCountModel = document.getElementById("update_count_div");
    const addCountBtn = document.getElementById("add_count_btn");
    const cancelAddCountBtn = document.getElementById("cancel_add_count_btn");
    const status = document.createElement("p");
    status.id = "status";
    status.classList.add("status");

    const countDiv = document.createElement("div");
    countDiv.classList.add("count_div");

    const Available = document.createElement("p");
    Available.classList.add("available");
    Available.id = "available";
    Available.textContent = "Available :";

    const stockCountContainer = document.createElement("p");
    stockCountContainer.classList.add("stock_count");
    stockCountContainer.id = "stock_count";

    const stockCount = document.createElement("span");
    stockCount.style.cursor = "pointer";
    stockCount.textContent = product.count;

    stockCount.onclick = () => {
      updateCountModel.style.display = "inline-flex";
      document.getElementById("update_count").focus();
    };

    // deletion div
    const deletionDiv = document.createElement("div");
    deletionDiv.classList.add("deletion_div");
    deletionDiv.id = "deletion_div";
    deletionDiv.innerHTML = `<p> Delete </p>`;
    deletionDiv.onclick = () => {
      deleteProduct(index);
    };

    // Create spans
    const decrease = document.createElement("span");
    decrease.classList.add("decrease");
    decrease.id = "decrease";
    decrease.textContent = "- ";
    decrease.style.cursor = "pointer";

    const increase = document.createElement("span");
    increase.classList.add("increase");
    increase.id = "increase";
    increase.textContent = " +";
    increase.style.cursor = "pointer";

    // Helper function for stock status tracking
    const updateStatus = () => {
      const count = Number(product.count);
      if (count <= 60) {
        product.status = "Low Stock";
        status.textContent = product.status;
        status.style.color = "#920a0a";
      } else if (count <= 200) {
        product.status = "Medium Stock";
        status.textContent = product.status;

        status.style.color = "#ffa500";
      } else {
        product.status = "High Stock";
        status.textContent = product.status;

        status.style.color = "#29fe1d";
      }
    };

    addCountBtn.onclick = () => {
      const value = document.getElementById("update_count").value;
      product.count = value;
      stockCount.textContent = product.count;
      updateStatus();
      console.log(product);
      updateCountModel.style.display = "none";
      localStorage.setItem("stockProducts", JSON.stringify(stockProducts));
    };

    cancelAddCountBtn.onclick = () => {
      updateCountModel.style.display = "none";
    };

    // Attach click handlers directly to elements
    decrease.onclick = () => {
      if (product.count > 0) {
        product.count--;
        let count = product.count;
        stockCount.textContent = product.count;
        product.count = count;

        stockCountContainer.prepend(decrease);
        stockCountContainer.append(increase);
        updateStatus();
        localStorage.setItem("stockProducts", JSON.stringify(stockProducts));
        console.log(product);
      }
    };

    increase.onclick = () => {
      product.count++;
      stockCount.textContent = product.count;

      stockCountContainer.prepend(decrease);
      stockCountContainer.append(increase);
      updateStatus();
      localStorage.setItem("stockProducts", JSON.stringify(stockProducts));
      console.log(product);
    };

    // Stock status
    updateStatus();

    // Append elements
    stockCountContainer.prepend(decrease);
    stockCountContainer.append(stockCount);
    stockCountContainer.append(increase);
    countDiv.append(Available, stockCountContainer, status);

    const productContainer = document.createElement("div");
    const proDiv = document.createElement("div");
    proDiv.dataset.index = index;
    proDiv.classList.add("product_div");
    proDiv.innerHTML = `
      <div  class="name_div">
        <p class="name">${product.productName}</p>
        <p class="unit">${product.unit}</p>
      </div>
    `;
    proDiv.append(countDiv);
    productContainer.append(proDiv);
    productContainer.append(deletionDiv);
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
    const products = JSON.parse(localStorage.getItem("stockProducts") || "[]");
    productsList.innerHTML = "";
    const searchItem = searchInput.value.trim();
    const filteredProducts = products.filter(
      (product) =>
        product.productName.toLowerCase().includes(searchItem.toLowerCase()) ||
        product.unit.toLowerCase().includes(searchItem.toLowerCase()) ||
        product.status.toLowerCase().includes(searchItem.toLowerCase())
    );

    filteredProducts.forEach((product) => {
      const updateCountModel = document.getElementById("update_count_div");
      const addCountBtn = document.getElementById("add_count_btn");
      const cancelAddCountBtn = document.getElementById("cancel_add_count_btn");
      const status = document.createElement("p");
      status.id = "status";
      status.classList.add("status");

      const countDiv = document.createElement("div");
      countDiv.classList.add("count_div");

      const Available = document.createElement("p");
      Available.classList.add("available");
      Available.id = "available";
      Available.textContent = "Available :";

      const stockCountContainer = document.createElement("p");
      stockCountContainer.classList.add("stock_count");
      stockCountContainer.id = "stock_count";

      const stockCount = document.createElement("span");
      stockCount.style.cursor = "pointer";
      stockCount.textContent = product.count;

      stockCount.onclick = () => {
        updateCountModel.style.display = "inline-flex";
        document.getElementById("update_count").focus();
      };

      // deletion div
      const deletionDiv = document.createElement("div");
      deletionDiv.classList.add("deletion_div");
      deletionDiv.innerHTML = `<p>Delete</p>`;
      deletionDiv.style.display = "none";

      // Create spans
      const decrease = document.createElement("span");
      decrease.id = "decrease";
      decrease.textContent = "- ";
      decrease.style.cursor = "pointer";

      const increase = document.createElement("span");
      increase.id = "increase";
      increase.textContent = " +";
      increase.style.cursor = "pointer";

      // Helper function for stock status tracking
      const updateStatus = () => {
        const count = Number(product.count);
        if (count <= 60) {
          product.status = "Low Stock";
          status.textContent = product.status;
          status.style.color = "#920a0a";
        } else if (count <= 200) {
          product.status = "Medium Stock";
          status.textContent = product.status;

          status.style.color = "#ffa500";
        } else {
          product.status = "High Stock";
          status.textContent = product.status;

          status.style.color = "#29fe1d";
        }
      };

      addCountBtn.onclick = () => {
        const value = document.getElementById("update_count").value;
        product.count = value;
        stockCount.textContent = product.count;
        updateStatus();
        console.log(product);
        updateCountModel.style.display = "none";
        localStorage.setItem("stockProducts", JSON.stringify(stockProducts));
      };

      cancelAddCountBtn.onclick = () => {
        updateCountModel.style.display = "none";
      };

      // Attach click handlers directly to elements
      decrease.onclick = () => {
        if (product.count > 0) {
          product.count--;
          let count = product.count;
          stockCount.textContent = product.count;
          product.count = count;

          stockCountContainer.prepend(decrease);
          stockCountContainer.append(increase);
          updateStatus();
          localStorage.setItem("stockProducts", JSON.stringify(stockProducts));
          console.log(product);
        }
      };

      increase.onclick = () => {
        product.count++;
        stockCount.textContent = product.count;

        stockCountContainer.prepend(decrease);
        stockCountContainer.append(increase);
        updateStatus();
        localStorage.setItem("stockProducts", JSON.stringify(stockProducts));
        console.log(product);
      };

      // Stock status
      updateStatus();

      // Append elements
      stockCountContainer.prepend(decrease);
      stockCountContainer.append(stockCount);
      stockCountContainer.append(increase);
      countDiv.append(Available, stockCountContainer, status);

      const proDiv = document.createElement("div");
      proDiv.classList.add("product_div");
      proDiv.innerHTML = `
      <div class="name_div">
        <p class="name">${product.productName}</p>
        <p class="unit">${product.unit}</p>
      </div>
    `;
      proDiv.append(countDiv);
      proDiv.append(deletionDiv);

      productsList.prepend(proDiv);
    });
  });
};

search();

const deleteProduct = (id) => {
  const products = JSON.parse(localStorage.getItem("stockProducts") || "[]");

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
    products.splice(id, 1);

    body.classList.remove("no_scroll");
    overlay.style.display = "none";
    deleteModel.style.display = "none";
    localStorage.setItem("stockProducts", JSON.stringify(products));
    renderProducts();
  };
};
