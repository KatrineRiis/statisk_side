const id = 1528;
const productURL = "https://kea-alt-del.dk/t7/api/products/" + id;
const productcontainer = document.querySelector("#productContainer");

function getData() {
  fetch(productURL).then((res) => res.json().then((data) => show(data)));
}

function show(data) {
  productcontainer.innerHTML = `
 <div class="item_card">
      <article class="item">
        <div class="grid_1_1">
          <img src="https://kea-alt-del.dk/t7/images/webp/1000/${data.id}.webp" alt="${data.productdisplayname}" />

          <div class="text_wrapper">
            <h1 class="brand">${data.brandname}</h1>
            <h3 class="item_header">${data.productdisplayname}</h3>
               <h4 class="variantname">${data.variantname}</h4>
            <p class="gender">${data.gender}</p>
            <p class="basecolour">Color: ${data.basecolour}</p>
              <p class="season">${data.season}</p>
                <p class="production">Production year: ${data.productionyear}</p>
                <p class="item_status">1999 kr</p>
                        <p class="item_price">${data.price} kr</p>
                           <p class="stock_status">In stock: ${data.soldout}</p>
                            <a href="product.html" class="item_btn">Tilføj til kurv</a>
                           <p class="description">${data.description}</p>`;
}

getData();
