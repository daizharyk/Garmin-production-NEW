
import {fetchData} from "./itemService.js"
import "../style/style.css";
import "../style/shipping.css";
import "../style/itempage.css";

const data = await fetchData();
// Функция для создания карточек
export function createCards(data) {
  const container = document.getElementById("cards-container");

  data.items.forEach((item) => {
    const link = document.createElement("a");
    link.href = `pages/itempage.html?id=${item.id}`;
    link.classList.add("card-link");

    const cardImg = document.createElement("div");
    cardImg.classList.add("item-card-img");
    const img = document.createElement("img");
    img.src = `img/smartwatches/${item.image}`;
    img.alt = item.name;
    cardImg.appendChild(img);

    const cardDesc = document.createElement("figcaption");
    cardDesc.classList.add("product-card-description");
    const title = document.createElement("h2");

    let titleText = item.name;
    titleText = titleText.replace(/®/g, '<sup class="registered">®</sup>');
    titleText = titleText.replace(/™/g, '<sup class="trademark2">™</sup>');
    title.innerHTML = titleText;

    const description = document.createElement("p");
    description.classList.add("product-description");
    description.textContent = item.text;
    const price = document.createElement("p");
    price.classList.add("price-text");
    price.textContent = `$${item.price.toFixed(2)} USD`;

    cardDesc.appendChild(title);
    cardDesc.appendChild(description);
    cardDesc.appendChild(price);

    link.appendChild(cardImg);
    link.appendChild(cardDesc);

    container.appendChild(link);
  });
}

export function createNewCards() {
  const items = data.items;
  const newCardsContainer = document.querySelector(".new-cards-container");

  newCardsContainer.innerHTML = "";

  function createCard(item) {
    const newCard = document.createElement("div");

    const cardLink = document.createElement("a");
    cardLink.href = `/pages/itempage.html?id=${item.id}`;
    cardLink.classList.add("card-link-dropdownmenu");

    newCard.classList.add("new-card");

    const img = document.createElement("img");
    img.src = `../img/smartwatch_info_pictures/${item.folder_name}/${item.carousel_images[2]}`;
    img.alt = item.name;

    const newCardDescription = document.createElement("div");
    newCardDescription.classList.add("new-card-discription");

    const h2 = document.createElement("h2");
    h2.textContent = item.name;

    newCardDescription.appendChild(h2);
    newCard.appendChild(img);
    newCard.appendChild(newCardDescription);
    cardLink.appendChild(newCard);

    return cardLink;
  }

  const idsToCreate = [9, 7];
  idsToCreate.forEach((id) => {
    const item = items.find((i) => i.id === id);
    if (item) {
      const card = createCard(item);
      newCardsContainer.appendChild(card);
    }
  });
}

export function scrollToItems() {
  let shopall = document.getElementById("shopall");
  let cardsContent = document.querySelector(".cards-content");

  let scrollIntoElement = (el) => {
    el.scrollIntoView({ behavior: "smooth" });
  };
  shopall.addEventListener("click", (e) => {
    e.preventDefault();
    scrollIntoElement(cardsContent);
  });
}
