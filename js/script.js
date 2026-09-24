const mainImg = document.querySelector(".product-card__image");
const previewLinks = document.querySelectorAll(".product-card__thumb");

// -----------------------------------------
// Клик по превью
// -----------------------------------------

previewLinks.forEach((link) => {
  link.addEventListener("click", function (event) {
    // Не открываем Fancybox при клике по превью
    event.preventDefault();

    const preview = this.querySelector(".preview");

    // Меняем большую картинку
    mainImg.src = preview.dataset.full;

    // Меняем active
    previewLinks.forEach((item) => {
      item.classList.remove("active");
    });

    this.classList.add("active");
  });
});

// -----------------------------------------
// Fancybox
// -----------------------------------------

Fancybox.bind('[data-fancybox="gallery"]', {
  Thumbs: {
    type: "classic",
  },

  Toolbar: {
    display: {
      left: [],
      middle: [],
      right: ["close"],
    },
  },
});

// -----------------------------------------
// Клик по большой картинке
// -----------------------------------------

mainImg.addEventListener("click", () => {
  const activeLink = document.querySelector(
    '.product-card__thumb.active[data-fancybox="gallery"]'
  );

  if (!activeLink) return;

  // Открываем Fancybox через API
  Fancybox.show(
    Array.from(previewLinks).map((link) => ({
      src: link.href,
      type: "image",
    })),
    {
      startIndex: Number(activeLink.dataset.index),

      Thumbs: {
        type: "classic",
      },

      Toolbar: {
        display: {
          left: [],
          middle: [],
          right: ["close"],
        },
      },
    }
  );
});

// -----------------------------------------
// Выбор фасовки
// -----------------------------------------

const weightInputs = document.querySelectorAll('input[name="weight"]');
const priceEl = document.getElementById("current-price");
const oldPriceEl = document.getElementById("current-old-price");
const articleEl = document.getElementById("current-article");
const stockEl = document.getElementById("current-stock");

weightInputs.forEach((input) => {
  input.addEventListener("change", () => {
    priceEl.textContent = input.dataset.price;
    oldPriceEl.textContent = input.dataset.oldPrice;
    articleEl.textContent = input.dataset.article;
    stockEl.textContent = input.dataset.stock;
  });
});

document.querySelectorAll(".tabs__btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const tabId = btn.dataset.tab;

    // Убираем active у всех кнопок и панелей
    document.querySelectorAll(".tabs__btn").forEach((b) => {
      b.classList.remove("active");
      b.setAttribute("aria-selected", "false");
    });
    document
      .querySelectorAll(".tabs__panel")
      .forEach((p) => p.classList.remove("active"));

    // Добавляем active текущим
    btn.classList.add("active");
    btn.setAttribute("aria-selected", "true");
    document.getElementById(tabId).classList.add("active");
  });
});
