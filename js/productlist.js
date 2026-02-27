const listURL = "https://kea-alt-del.dk/t7/api/products?start=10&limit=12";
const listContainer = document.querySelector(".product-gallery");

function getProducts() {
  fetch(listURL).then((res) => res.json().then((products) => showProducts(products)));
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
    <h2>${product.brandname}</h2>
    <h3>${product.productdisplayname}</h3>
    <img 
  class="${imageClass}"src="https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp" alt="${product.productdisplayname}"/>

    <p class="price">
      ${priceHTML}
    </p>

    <a href="product.html" class="btn">Køb nu</a>
  </article>
`;
  });
}
getProducts();
