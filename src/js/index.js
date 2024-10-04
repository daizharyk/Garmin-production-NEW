import {fetchData} from "./itemService.js"
import "../style/style.css";
import "../style/shipping.css";
import "../style/itempage.css";


async function loadModule() {
  try {
    const data = await fetchData(); 

    const module = await import(/* webpackChunkName: "html-module" */ "./htmlBuilder.js");
    const { createCards, scrollToItems, createNewCards } = module;

    createCards(data); 
    scrollToItems();
    createNewCards();
  } catch (error) {
    console.error("Ошибка при загрузке модуля:", error);
  }
}

loadModule();