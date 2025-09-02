const homeIcon = document.querySelector(".home_icon");
const allIcon = document.querySelector(".all_icon");
const editIcon = document.querySelector(".edit_icon");
const inventoryIcon = document.querySelector(".inventory_icon");
const profileIcon = document.querySelector(".profile_icon");

homeIcon.onclick = () => {
  homeIcon.classList.add("active");
  allIcon.classList.remove("active");
  editIcon.classList.remove("active");
  inventoryIcon.classList.remove("active");
  profileIcon.classList.remove("active");
};
allIcon.onclick = () => {
  allIcon.classList.add("active");
  homeIcon.classList.remove("active");
  editIcon.classList.remove("active");
  inventoryIcon.classList.remove("active");
  profileIcon.classList.remove("active");
};
editIcon.onclick = () => {
  editIcon.classList.add("active");
  allIcon.classList.remove("active");
  homeIcon.classList.remove("active");
  inventoryIcon.classList.remove("active");
  profileIcon.classList.remove("active");
};
inventoryIcon.onclick = () => {
  inventoryIcon.classList.add("active");
  allIcon.classList.remove("active");
  editIcon.classList.remove("active");
  homeIcon.classList.remove("active");
  profileIcon.classList.remove("active");
};
profileIcon.onclick = () => {
  profileIcon.classList.add("active");
  allIcon.classList.remove("active");
  editIcon.classList.remove("active");
  inventoryIcon.classList.remove("active");
  homeIcon.classList.remove("active");
};

const renderProducts = () => {
  const productsList = document.getElementById("products_list");
  const products = JSON.parse(localStorage.getItem("products") || []);
  console.log(products);

  if (products.length > 0) {
    productsList.innerHTML = "";
    products.forEach((product) => {
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
renderProducts();

const search = () => {
  const form = document.getElementById("form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
  });

  const searchInput = document.getElementById("search");
  searchInput.addEventListener("input", () => {
    const productsList = document.getElementById("products_list");
    const products = JSON.parse(localStorage.getItem("products") || []);
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
  });
};

search();
