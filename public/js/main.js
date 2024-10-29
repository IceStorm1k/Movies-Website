let header = document.querySelector("header");
let menu = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");
const navbarLinks = document.querySelectorAll(".navbar a");

navbarLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navbarLinks.forEach((el) => el.classList.remove("active"));
    link.classList.add("active");
  });
});


window.addEventListener("scroll", function () {
  header.classList.toggle("shadow", window.scrollY > 0);
})

menu.onclick = () => {
  menu.classList.toggle('bx-x');
  navbar.classList.toggle('active');
}

window.onscroll = () => {
  menu.classList.remove('bx-x');
  navbar.classList.remove('active');
}

var homeSwiper = new Swiper(".home", {
  spaceBetween: 30,
  centeredSlides: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  }
});

var comingSwiper = new Swiper(".coming-container", {
  spaceBetween: 20,
  loop: true,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  breakpoints: {
    0: {
      slidesPerView: 2
    },
    568: {
      slidesPerView: 3
    },
    768: {
      slidesPerView: 4
    },
    968: {
      slidesPerView: 5
    },
    1200: {
      slidesPerView: 6
    }
  }
});
