const listURL = "https://kea-alt-del.dk/t7/api/categories";
const listContainer = document.querySelector(".menu");

function getCategory() {
  fetch(listURL)
    .then((res) => res.json())
    .then((categories) => showCategories(categories));
}

function showCategories(categories) {
  listContainer.innerHTML = "";
  categories.forEach((category) => {
    listContainer.innerHTML += `
      <li>
        <a href="productlist.html?category=${category.category}">
          ${category.category}
        </a>
      </li>
    `;
  });
}

getCategory();
