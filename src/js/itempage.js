import { item } from "./itemService.js";
import "../style/style.css";
import "../style/shipping.css";
import "../style/itempage.css";

const navBar = document.querySelector(".nav-bar");
const navBarOffsetTop = navBar.offsetTop;
window.addEventListener("scroll", () => {
  const currentScroll =
    window.pageYOffset || document.documentElement.scrollTop;
  if (currentScroll >= navBarOffsetTop) {
    navBar.classList.add("sticky");
  } else {
    navBar.classList.remove("sticky");
  }
});

document
  .addEventListener("DOMContentLoaded", () => {
    document.querySelector(".product-title").textContent = item.name;
    document.querySelector(".product-color").textContent = item.color;
    const saleBox = document.getElementById("sale-box");
    document.title = item.product_title;
    saleBox.style.display = saleBox.textContent.trim() ? "inline-flex" : "none";

    document.getElementById("product-price").textContent =
      item.price.toFixed(2);
    const carousel = document.querySelector(".carousel");
    item.carousel_images.forEach((imgFileName) => {
      const div = document.createElement("div");
      div.classList.add("carousel-box");
      const imgSrc = `../img/smartwatch_info_pictures/${item.folder_name}/${imgFileName}`;
      const img = document.createElement("img");
      img.src = imgSrc;
      img.alt = item.name;
      img.classList.add("carousel-img");
      div.appendChild(img);
      carousel.appendChild(div);

      const carousel1 = document.querySelector(".carousel1");
      carousel1.innerHTML = "";
      item.carousel_images.forEach((imgFileName) => {
        const div = document.createElement("div");
        div.classList.add("carousel-box1");
        const imgSrc = `../img/smartwatch_info_pictures/${item.folder_name}/${imgFileName}`;
        const img = document.createElement("img");
        img.src = imgSrc;
        img.alt = item.name;
        img.classList.add("carousel-img1");
        div.appendChild(img);
        carousel1.appendChild(div);
      });
    });
    const folderName = item.folder_name;

    document.querySelector(".banner-title").textContent =
      item.banner_text.title;
    document.querySelector(".disc-right").textContent = item.banner_text.text;
    document.getElementById("bannerwithtext").src =
      `../img/smartwatch_info_pictures/${folderName}/${item.banner_text.banner_images.main_banner}`;
    document.getElementById("bannerwithtext").alt =
      item.banner_text.banner_images.alt;
    document.getElementById("bannerwithtext-adaptive").src =
      `../img/smartwatch_info_pictures/${folderName}/${item.banner_text.banner_images.adaptive_banner}`;
    document.getElementById("bannerwithtext-adaptive").alt =
      item.banner_text.banner_images.alt;

    const videoThumbnail = document.querySelector(".video-thumbnail");
    videoThumbnail.querySelector("img").src =
      `../img/smartwatch_info_pictures/${folderName}/${item.video_section.thumbnail}`;
    document.querySelector(".thumbnail-img").alt = item.video_section.thumbnail;
    document.getElementById("video-player").src = item.video_section.video_url;

    document.querySelector(".walpapperinfo").src =
      `../img/smartwatch_info_pictures/${folderName}/${item.additional_images.main_image}`;
    document.querySelector(".walpapperinfo-adaptive").src =
      `../img/smartwatch_info_pictures/${folderName}/${item.additional_images.adaptive_image}`;

    const functionInfoContainer = document.querySelector(".cards-container");
    item.watch_features.forEach((feature) => {
      const card = document.createElement("div");
      card.classList.add("function-info-card");
      const img = document.createElement("img");
      img.src = `../img/smartwatch_info_pictures/${folderName}/${feature.image}`;
      img.alt = feature.title;
      const title = document.createElement("h2");
      title.textContent = feature.title;
      const description = document.createElement("p");
      description.textContent = feature.description;
      card.appendChild(img);
      card.appendChild(title);
      card.appendChild(description);
      functionInfoContainer.appendChild(card);
    });

    function replaceSymbols(text) {
      return text
        .replace(/®/g, '<sup class="registered">®</sup>')
        .replace(/™/g, '<sup class="trademark2">™</sup>');
    }
    document.querySelector(".banner-title").innerHTML = replaceSymbols(
      item.banner_text.title
    );
    document.querySelector(".product-title").innerHTML = replaceSymbols(
      item.product_title
    );

    initCarousel();
  })
  

function initCarousel() {
  const carouselHorizontal = document.querySelector(".carousel1");
  const carouselItemsHorizontal = Array.from(carouselHorizontal.children);
  const carouselLeft = document.getElementById("carouselLeft1");
  const carouselRight = document.getElementById("carouselRight1");

  const carouselVertical = document.querySelector(".carousel");
  const carouselItemsVertical = Array.from(carouselVertical.children);

  let currentIndex = 0;

  const updateCarousel = () => {
    // Обновление горизонтального каруселя
    const offset = -currentIndex * 100; // 100% ширины одного элемента
    carouselHorizontal.style.transform = `translateX(${offset}%)`;

    carouselLeft.style.display = currentIndex === 0 ? "none" : "flex";
    carouselRight.style.display =
      currentIndex === carouselItemsHorizontal.length - 1 ? "none" : "flex";

    // Обновление вертикального каруселя
    const verticalOffset = currentIndex * 80; // Высота элемента в пикселях
    carouselVertical.scrollTo({
      top: verticalOffset,
      behavior: "smooth",
    });

    carouselItemsVertical.forEach((img, index) => {
      if (index === currentIndex) {
        img.classList.add("selected");
      } else {
        img.classList.remove("selected");
      }
    });
  };

  const moveToNext = () => {
    if (currentIndex < carouselItemsHorizontal.length - 1) {
      currentIndex += 1;
      updateCarousel();
    }
  };

  const moveToPrevious = () => {
    if (currentIndex > 0) {
      currentIndex -= 1;
      updateCarousel();
    }
  };

  carouselLeft.addEventListener("click", moveToPrevious);
  carouselRight.addEventListener("click", moveToNext);

  updateCarousel();

  document.querySelectorAll(".carousel-img").forEach((img, index) => {
    img.addEventListener("click", function () {
      currentIndex = index;
      updateCarousel();
    });
  });

  let touchStartX = 0;
  let touchEndX = 0;

  const handleSwipe = () => {
    const swipeDistance = touchStartX - touchEndX;

    if (swipeDistance > 50) {
      moveToNext();
    } else if (swipeDistance < -50) {
      moveToPrevious();
    }
  };

  carouselHorizontal.addEventListener("touchstart", (event) => {
    touchStartX = event.touches[0].clientX;
  });

  carouselHorizontal.addEventListener("touchend", (event) => {
    touchEndX = event.changedTouches[0].clientX;
    handleSwipe();
  });

  const playButton = document.querySelector(".play-button");
  const videoThumbnail = document.querySelector(".video-thumbnail");
  const videoPlayer = document.getElementById("video-player");

  playButton.addEventListener("click", function () {
    videoThumbnail.style.display = "none";

    videoPlayer.style.display = "block";
    videoPlayer.src += "&autoplay=1";
  });

  const upButton = document.getElementById("carouselUp");
  const downButton = document.getElementById("carouselDown");

  // Функция для обновления состояния кнопок
  function updateButtonState() {
    if (carouselVertical.scrollTop <= 0) {
      upButton.disabled = true;
    } else {
      upButton.disabled = false;
    }

    if (
      carouselVertical.scrollTop + carouselVertical.clientHeight >=
      carouselVertical.scrollHeight
    ) {
      downButton.disabled = true;
    } else {
      downButton.disabled = false;
    }
  }
 

  
  upButton.addEventListener("click", () => {
    carouselVertical.scrollBy({
      top: -80,
      behavior: "smooth",
    });
    setTimeout(updateButtonState, 500);
  });


  downButton.addEventListener("click", () => {
    carouselVertical.scrollBy({
      top: 80,
      behavior: "smooth",
    });
    setTimeout(updateButtonState, 500);
  });
}
