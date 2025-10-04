const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");
const menuBtnIcon = menuBtn.querySelector("i");

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

const scrollRevealOption = {
  distance: "50px",
  origin: "bottom",
  duration: 1000,
};

// Logica de ScrollReveal pentru a nu da eroare la prima rulare (dacă librăria nu e gata)
if (typeof ScrollReveal !== 'undefined') {
    ScrollReveal().reveal(".header__container .section__header", {
      ...scrollRevealOption,
    });
}


let swiperViews;

if (typeof Swiper !== 'undefined') {
    // GALERIE ORIGINALĂ: Eliminăm 'const' și adăugăm noua excludere.
    swiper = new Swiper(".swiper:not(.swiper-reviews, .swiper-views)", {
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

    // REVIEWS: SWIPER NOU: Eliminăm 'const'.
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
}


// CALCULATOR DE PRET (CORECTAT)
const calculateBtn = document.getElementById("calculate-btn");

if (calculateBtn) { // Asigură-te că butonul există
  calculateBtn.addEventListener("click", () => {
    // Folosim o logică de siguranță pentru a preveni erorile 'null'
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

    // Ratele de preț
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


// LOGICA SCROLLREVEAL PENTRU SECTIUNILE EXISTENTE (CORECTATĂ CU VERIFICARE)
if (typeof ScrollReveal !== 'undefined') {
    ScrollReveal().reveal(".service__container .section__subheader", {
      ...scrollRevealOption,
    });
    ScrollReveal().reveal(".service__container .section__header", {
      ...scrollRevealOption,
      delay: 500,
    });

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
}


// LOGICA INSTAGRAM SCROLL
const instagram = document.querySelector(".instagram__images");

if (instagram) { // Asigură-te că elementul există
    const instagramContent = Array.from(instagram.children);

    instagramContent.forEach((item) => {
      const duplicateNode = item.cloneNode(true);
      duplicateNode.setAttribute("aria-hidden", true);
      instagram.appendChild(duplicateNode);
    });
}


// === LOGICA FAQ ACORDION FINALĂ ȘI IZOLATĂ ===

// Rulează logica doar după ce întregul DOM este încărcat
document.addEventListener("DOMContentLoaded", function() {

    const faqItems = document.querySelectorAll(".faq__item");

    if (faqItems.length === 0) {
        return;
    }

    faqItems.forEach((item) => {
        const question = item.querySelector(".faq__question");

        if (!question) return;

        question.addEventListener("click", () => {
            // Închide toate celelalte FAQ-uri deschise
            faqItems.forEach((otherItem) => {
                if (otherItem !== item && otherItem.classList.contains("open")) {
                    otherItem.classList.remove("open");
                }
            });

            // Deschide/Închide elementul curent
            item.classList.toggle("open");
        });
    });
});
if (typeof Swiper !== 'undefined') {
    const swiperViews = new Swiper(".swiper-views", {
        loop: true,
        grabCursor: true,
        spaceBetween: 20,
        centeredSlides: true,
        slidesPerView: "auto", // Afiseaza cate carduri incap
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        breakpoints: {
            768: {
                spaceBetween: 30,
            },
            1024: {
                spaceBetween: 40,
            },
        },
    });
}
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
    const increment = end / (duration / 16); // 16ms = aprox. 60 FPS

    // Verifică dacă valoarea este suficient de mare pentru a avea animație
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

// Funcție care rulează contorul la intrarea în vizualizare
let hasCounted = false;

function handleScrollCount() {
    const statValues = document.querySelectorAll(".stat__value, .breakdown__value");

    if (hasCounted || statValues.length === 0) return;

    if (isElementInViewport(document.querySelector(".stats__container"))) {
        statValues.forEach(target => {
            countUp(target);
        });
        hasCounted = true; // Setează steagul pentru a rula o singură dată
        window.removeEventListener('scroll', handleScrollCount);
    }
}

// Asigură-te că funcția se rulează la încărcarea inițială și la scroll
window.addEventListener('scroll', handleScrollCount);
window.addEventListener('load', handleScrollCount);
// NOU: INIȚIALIZARE SWIPER PENTRU POSTĂRI
if (typeof Swiper !== 'undefined') {
    const swiperPosts = new Swiper(".posts__slider", {
      loop: true,
      grabCursor: true,
      spaceBetween: 30,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },

      // LOGICA RESPONSIVĂ: Câte slide-uri să afișeze
      breakpoints: {
        // Mobil (implicit)
        0: {
          slidesPerView: 1,
        },
        // Tabletă
        768: {
          slidesPerView: 2,
        },
        // Desktop
        1024: {
          slidesPerView: 3,
        },
      },
    });
}