const renderProducts = () => {
  const productsList = document.getElementById("products_list");

  if (allProducts.length > 0) {
    productsList.innerHTML = "";
    allProducts.forEach((product) => {
      const productDiv = document.createElement("div");
      const pricesContainer = document.createElement("ul");
      const productName = document.createElement("p");
      Object.values(product.units).forEach((unit) => {
        const unitLi = document.createElement("li");
        unitLi.textContent = unit;
        unitLi.classList.add("price");
        pricesContainer.append(unitLi);
      });

      productDiv.classList.add("product_div");
      pricesContainer.classList.add("product_units");
      productName.classList.add("product_name");

      productName.textContent = product.product_name;

      productDiv.append(productName, pricesContainer);
      productsList.prepend(productDiv);
    });
  }
};
//renderProducts();

const search = () => {
  const form = document.getElementById("form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
  });

  const searchInput = document.getElementById("search");
  searchInput.addEventListener("input", () => {
    const productsList = document.getElementById("products_list");
    const products = JSON.parse(localStorage.getItem("products") || []);
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
      const productDiv = document.createElement("div");
      const pricesContainer = document.createElement("ul");
      const productName = document.createElement("p");
      Object.values(product.units).forEach((unit) => {
        const unitLi = document.createElement("li");
        unitLi.textContent = unit;
        unitLi.classList.add("price");
        pricesContainer.append(unitLi);
      });

      productDiv.classList.add("product_div");
      pricesContainer.classList.add("product_units");
      productName.classList.add("product_name");

      productName.textContent = product.product_name;

      productDiv.append(productName, pricesContainer);
      productsList.prepend(productDiv);
      if (searchItem === "") {
        const elements = document.querySelectorAll(".product_div");
        elements.forEach((element) => {
          element.style.display = "none";
        });
      }
    });
  });
};

search();
