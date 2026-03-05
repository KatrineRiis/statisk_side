/* fetch(fetchUrl)
  .then((res) => res.json())
  .then((data) => {
    console.log("Produkter:", data);
  }); */
//const listURL = "https://kea-alt-del.dk/t7/api/products?start=10&limit=12";

const params = new URLSearchParams(window.location.search);
const category = params.get("category");
console.log(category);

const listURL = category ? `https://kea-alt-del.dk/t7/api/products?category=${encodeURIComponent(category)}&limit=48` : "https://kea-alt-del.dk/t7/api/products";

const listContainer = document.querySelector(".product-gallery");
const sortByPriceBtn = document.querySelector("#sortByPriceBtn");
const filterWomenBtn = document.querySelector("#filterWomenBtn");
const showAllBtn = document.querySelector("#showAllBtn");

let allProducts = [];

function getProducts() {
  fetch(listURL)
    .then((res) => res.json())
    .then((products) => {
      allProducts = products;
      showProducts(products);
    });
}
function showProducts(products) {
  listContainer.innerHTML = "";

  products.forEach((product) => {
    const price = product.price;
    const discount = product.discount;

    let discountedPrice;

    if (discount) {
      discountedPrice = price - (price * discount) / 100;
    } else {
      discountedPrice = price;
    }

    let priceHTML;

    if (product.soldout === 1) {
      priceHTML = `<span class="sold_out">Sold out</span>`;
    } else if (discount) {
      priceHTML = `
    <s>${price} kr</s>
    <span class="discounted_price">${discountedPrice.toFixed(0)} kr</span>
  `;
    } else {
      priceHTML = `${price} kr`;
    }

    let imageClass = "";

    if (product.soldout === 1) {
      imageClass = "productlist_img";
    }

    listContainer.innerHTML += `


  <article class="product">
    <h2 class ="brand">${product.brandname}</h2>
    <h3>${product.productdisplayname}</h3>
    <img 
  class="${imageClass}"src="https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp" alt="${product.productdisplayname}"/>
<p class="price">
  ${priceHTML}
  ${product.discount > 0 ? `<span class="badge">- ${product.discount}%</span>` : ""}
</p>
    <a href="product.html?id=${product.id}" class="btn">Køb nu</a>
  </article>
`;
  });
}
//getProducts();

function sortByPriceAsc() {
  const sorted = [...allProducts].sort((a, b) => a.price - b.price);
  showProducts(sorted);
}

function filterByGender(targetGender) {
  const filtered = allProducts.filter((product) => (product.gender || "").toLowerCase() === targetGender.toLowerCase());

  showProducts(filtered);
}

sortByPriceBtn.addEventListener("click", sortByPriceAsc);
filterWomenBtn.addEventListener("click", () => filterByGender("Women"));
showAllBtn.addEventListener("click", () => showProducts(allProducts));
getProducts();
