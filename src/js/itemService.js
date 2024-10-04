import data from "../data/item.json" with { type: "json" };


function getItemById(itemId) {
  return data.items.find((item) => item.id == itemId);
}

const params = new URLSearchParams(location.search);
const itemId = params.get("id");

export const item = getItemById(itemId);


export async function fetchData() {
  const response = await fetch('../data/item.json');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  return data;
}

