const params = new URLSearchParams(window.location.search);
const id = params.get("id");

console.log("id:", id);

//const id = 1528;
const productURL = "https://kea-alt-del.dk/t7/api/products/" + id;
const productcontainer = document.querySelector("#productContainer");

function getData() {
  fetch(productURL).then((res) => res.json().then((data) => show(data)));
}

function show(data) {
  const price = data.price;
  const discount = data.discount;

  let discountedPrice;

  if (discount) {
    discountedPrice = price - (price * discount) / 100;
  } else {
    discountedPrice = price;
  }

  let priceHTML;

  if (data.soldout === 1) {
    priceHTML = `<span class="sold_out">Sold out</span>`;
  } else if (discount) {
    priceHTML = `
      <s>${price} kr</s>
      <p class="discounted_price">${discountedPrice.toFixed(0)} kr</p>
    `;
  } else {
    priceHTML = `${price} kr`;
  }

  productcontainer.innerHTML = `
    <div class="item_card">
      <article class="item">
        <div class="grid_1_1">
          <img src="https://kea-alt-del.dk/t7/images/webp/640/${data.id}.webp" alt="${data.productdisplayname}" />

          <div class="text_wrapper">
            <h1 class="brand">${data.brandname}</h1>
            <h3 class="item_header">${data.productdisplayname}</h3>
            <h4 class="variantname">${data.variantname}</h4>
            <p class="gender">${data.gender}</p>
            <p class="basecolour">Color: ${data.basecolour}</p>
            <p class="season">${data.season}</p>
            <p class="production">Production year: ${data.productionyear}</p>

            <p class="item_price">${priceHTML}</p>

            <p class="stock_status">
              ${data.soldout === 1 ? "Sold out" : "In stock"}
            </p>

            <a href="product.html" class="item_btn">Tilføj til kurv</a>
            <p class="description">${data.description}</p>
          </div>
        </div>
      </article>
    </div>
  `;
}
getData();
