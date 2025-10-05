// === DECLARAȚII GLOBALE ===
const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");
const menuBtnIcon = menuBtn.querySelector("i");

let swiper; // Global pentru galeria principală
let swiperReviews; // Global pentru Reviews
let swiperViews; // Global pentru Views (DESTINATIONS)
let swiperPosts; // NOU: Global pentru Posts

// === LOGICĂ MENIU MOBIL ===
menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("open");

  const isOpen = navLinks.classList.contains("open");
  menuBtnIcon.setAttribute(
    "class",
    isOpen ? "ri-close-line" : "ri-menu-4-line"
  );
});

navLinks.addEventListener("click", () => {
  navLinks.classList.remove("open");
  menuBtnIcon.setAttribute("class", "ri-menu-4-line");
});


// === CONFIGURARE SCROLLREVEAL ===
const scrollRevealOption = {
  distance: "50px",
  origin: "bottom",
  duration: 1000,
};


// === INIȚIALIZARE SWIPER ===
if (typeof Swiper !== 'undefined') {
    // 1. GALERIE ORIGINALĂ (FIX: loop: true este aici și funcționează acum)
    swiper = new Swiper(".swiper:not(.swiper-reviews, .swiper-views, .posts__slider)", {
      loop: true,
      effect: "coverflow",
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: "auto",
      coverflowEffect: {
        rotate: 0,
        depth: 0,
        modifier: 1,
        scale: 0.9,
        stretch: 0,
      },
    });

    // 2. REVIEWS
    swiperReviews = new Swiper(".swiper-reviews", {
      loop: true,
      grabCursor: true,
      spaceBetween: 30,
      breakpoints: {
        640: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 3,
        },
      },
    });

    // 3. VIEWS (DESTINATIONS)
     swiperViews = new Swiper(".swiper-views", {
         loop: true,
         grabCursor: true,
         spaceBetween: 20,
         centeredSlides: true,
         slidesPerView: "auto",

         // === AUTOPLAY ACTIVAT PENTRU VIEWS ===
         autoplay: {
             delay: 3500,
             disableOnInteraction: false,
         },

         pagination: {
             el: ".swiper-pagination",
             clickable: true,
         },
         // Logica de Breakpoints rămâne intactă:
         breakpoints: {
             768: {
                 spaceBetween: 30,
             },
             1024: {
                 spaceBetween: 40,
             },
         },
     });

    // 4. POSTS: CORECTAT PENTRU MOBIL ȘI DESKTOP
    swiperPosts = new Swiper(".posts__slider", {
      loop: true, // FIX: Loop-ul este activat
      grabCursor: true,
      spaceBetween: 30, // Default for large screens

      // Autoplay
      autoplay: {
        delay: 3500,
        disableOnInteraction: false,
      },

      // BARA DE PROGRES
      pagination: {
        el: ".posts__slider .swiper-progress-bar",
        type: "progressbar",
      },

      // Navigație (if used)
      navigation: {
        nextEl: ".posts__slider .swiper-button-next",
        prevEl: ".posts__slider .swiper-button-prev",
      },

      // LOGICA RESPONSIVĂ
      breakpoints: {
        0: {
          slidesPerView: 1,
          spaceBetween: 0, // FIX CRITIC PENTRU MOBIL
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
      },
    });

} // End of if (typeof Swiper !== 'undefined')


// === CALCULATOR DE PRET ===
const calculateBtn = document.getElementById("calculate-btn");

if (calculateBtn) {
  calculateBtn.addEventListener("click", () => {
    const distanceInput = document.getElementById("distance");
    const sedanCountInput = document.getElementById("sedan-count");
    const truckCountInput = document.getElementById("truck-count");

    if (!distanceInput || !sedanCountInput || !truckCountInput) {
        document.getElementById("total-price").textContent = "Error: Missing input fields";
        return;
    }

    const distance = parseFloat(distanceInput.value) || 0;
    const sedanCount = parseFloat(sedanCountInput.value) || 0;
    const truckCount = parseFloat(truckCountInput.value) || 0;

    const SEDAN_RATE = 1.00;
    const TRUCK_RATE = 1.50;

    if (distance <= 0) {
      document.getElementById("total-price").textContent = "Invalid Distance";
      return;
    }

    const sedanCost = sedanCount * distance * SEDAN_RATE;
    const truckCost = truckCount * distance * TRUCK_RATE;

    const totalPrice = sedanCost + truckCost;

    document.getElementById("total-price").textContent = `$${totalPrice.toFixed(2)}`;
  });
}


// === LOGICA SCROLLREVEAL PENTRU SECTIUNI ===
if (typeof ScrollReveal !== 'undefined') {
    ScrollReveal().reveal(".header__container .section__header", {
      ...scrollRevealOption,
    });

    // Animațiile pentru SERVICE și alte secțiuni (nemodificate)
    ScrollReveal().reveal(".service__container .section__subheader", {
      ...scrollRevealOption,
    });
    // ... (restul animațiilor pentru SERVICE) ...
    ScrollReveal().reveal(".service__row:nth-child(2n-1) img", {
      ...scrollRevealOption,
      origin: "left",
    });
    ScrollReveal().reveal(".service__row:nth-child(2n) img", {
      ...scrollRevealOption,
      origin: "right",
    });
    ScrollReveal().reveal(".service__details h4", {
      ...scrollRevealOption,
      delay: 500,
    });
    ScrollReveal().reveal(".service__details p", {
      ...scrollRevealOption,
      delay: 1000,
    });
    ScrollReveal().reveal(".service__btn", {
      ...scrollRevealOption,
      delay: 1500,
    });

    // 5. FIX CRITIC SWIPER VIEWS: Repară caruselul de Destinații la apariție
    ScrollReveal().reveal(".views__container", {
        ...scrollRevealOption,
        afterReveal: function (el) {
            if (swiperViews && swiperViews.update) {
                swiperViews.update();
            }
        }
    });

    // 6. FIX CRITIC SWIPER POSTS: Repară caruselul de Postări la apariție
    ScrollReveal().reveal(".posts__container .section__header", {
        ...scrollRevealOption,
        delay: 300,
        afterReveal: function (el) {
            if (swiperPosts && swiperPosts.update) {
                swiperPosts.update();
            }
        }
    });

    // NOU: Animație în cascadă pentru cardurile de postări
    ScrollReveal().reveal(".post__card", {
      ...scrollRevealOption,
      interval: 200,
      delay: 600,
    });
}


// === LOGICA INSTAGRAM SCROLL ===
const instagram = document.querySelector(".instagram__images");

if (instagram) {
    const instagramContent = Array.from(instagram.children);

    instagramContent.forEach((item) => {
      const duplicateNode = item.cloneNode(true);
      duplicateNode.setAttribute("aria-hidden", true);
      instagram.appendChild(duplicateNode);
    });
}


// === LOGICA FAQ ACORDION ===
document.addEventListener("DOMContentLoaded", function() {

    const faqItems = document.querySelectorAll(".faq__item");

    if (faqItems.length === 0) {
        return;
    }

    faqItems.forEach((item) => {
        const question = item.querySelector(".faq__question");

        if (!question) return;

        question.addEventListener("click", () => {
            faqItems.forEach((otherItem) => {
                if (otherItem !== item && otherItem.classList.contains("open")) {
                    otherItem.classList.remove("open");
                }
            });

            item.classList.toggle("open");
        });
    });
});


// === LOGICA DE COUNT UP ===
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

function countUp(target, duration = 2000) {
    let start = 0;
    const end = parseInt(target.getAttribute('data-target'));
    const increment = end / (duration / 16);

    if (end < 10) {
        target.textContent = end;
        return;
    }

    const counter = setInterval(() => {
        start += increment;
        if (start > end) {
            target.textContent = end;
            clearInterval(counter);
            return;
        }
        target.textContent = Math.ceil(start);
    }, 16);
}

let hasCounted = false;

function handleScrollCount() {
    const statValues = document.querySelectorAll(".stat__value, .breakdown__value");

    if (hasCounted || statValues.length === 0) return;

    if (isElementInViewport(document.querySelector(".stats__container"))) {
        statValues.forEach(target => {
            countUp(target);
        });
        hasCounted = true;
        window.removeEventListener('scroll', handleScrollCount);
    }
}

// Asigură-te că funcția se rulează la încărcarea inițială și la scroll
window.addEventListener('scroll', handleScrollCount);
window.addEventListener('load', handleScrollCount);