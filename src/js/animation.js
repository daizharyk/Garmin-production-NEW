import "../style/style.css";
import "../style/shipping.css";
import "../style/itempage.css";

document.querySelectorAll(".nav-list-item").forEach((item) => {
  item.addEventListener("click", () => {
    document.querySelectorAll(".nav-list-item.active").forEach((activeItem) => {
      if (activeItem !== item) {
        activeItem.classList.remove("active");
      }
    });
    item.classList.toggle("active");
  });
});

document.querySelectorAll(".nav-menu").forEach((menu) => {
  menu.addEventListener("mouseover", () => {
    const dropdownClass = `${menu.classList[1]}-dropdown`;
    const dropdown = document.querySelector(`.${dropdownClass}`);

    // Проверяем, существует ли dropdown
    if (dropdown) {
      dropdown.style.display = "flex";

      // Событие для dropdown при наведении мыши
      dropdown.addEventListener("mouseover", () => {
        dropdown.style.display = "flex";
      });

      // Событие для dropdown при уходе мыши
      dropdown.addEventListener("mouseout", () => {
        dropdown.style.display = "none";
      });
    }
  });

  // Событие для .nav-menu при уходе мыши
  menu.addEventListener("mouseout", () => {
    const dropdownClass = `${menu.classList[1]}-dropdown`;
    const dropdown = document.querySelector(`.${dropdownClass}`);

    // Проверяем, существует ли dropdown перед изменением стиля
    if (dropdown) {
      dropdown.style.display = "none";
    }
  });
});

document
  .getElementById("filterSortToggle")
  .addEventListener("click", function () {
    const sidebar = document.getElementById("sidebar");
    const filterDropdown = document.querySelector(".product-filter_dropdown");

    sidebar.style.display =
      sidebar.style.display === "none" || sidebar.style.display === ""
        ? "block"
        : "none";
    filterDropdown.classList.toggle("active");
  });
