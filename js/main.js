// carousel function - hero carousel

const track = document.querySelector(".carousel-images");
const slides = Array.from(track.children);
const nextButton = document.querySelector(".carousel-button-right");
const prevButton = document.querySelector(".carousel-button-left");
const dotsNav = document.querySelector(".carousel-nav");
const dots = Array.from(dotsNav.children);

const slideWidth = slides[0].getBoundingClientRect().width;

const setSlidePosition = (slide, index) => {
  slide.style.left = slideWidth * index + "px";
};
slides.forEach(setSlidePosition);

const moveToSlide = (track, currentSlide, targetSlide) => {
  track.style.transform = "translateX(-" + targetSlide.style.left + ")";
  currentSlide.classList.remove("current-slide");
  targetSlide.classList.add("current-slide");
};

const updateDots = (currentDot, targetDot) => {
  currentDot.classList.remove("current-slide");
  targetDot.classList.add("current-slide");
};

const hideShowArrows = (slides, prevButton, nextButton, targetIndex) => {
  if (targetIndex === 0) {
    prevButton.classList.add("is-hidden");
    nextButton.classList.remove("is-hidden");
  } else if (targetIndex === slides.length - 1) {
    prevButton.classList.remove("is-hidden");
    nextButton.classList.add("is-hidden");
  } else {
    prevButton.classList.remove("is-hidden");
    nextButton.classList.remove("is-hidden");
  }
};

const moveToNextSlide = () => {
  const currentSlide = track.querySelector(".current-slide");
  const nextSlide = currentSlide.nextElementSibling || slides[0]; // Loop back to start if needed
  const currentDot = dotsNav.querySelector(".current-slide");
  const nextDot = currentDot.nextElementSibling || dots[0]; // Loop back to start dot if needed
  const nextIndex = slides.findIndex((slide) => slide === nextSlide);

  moveToSlide(track, currentSlide, nextSlide);
  updateDots(currentDot, nextDot);
  hideShowArrows(slides, prevButton, nextButton, nextIndex);
};

// auto-playing
let slideInterval = setInterval(function () {
  const currentSlide = track.querySelector(".current-slide");
  const nextSlide = currentSlide.nextElementSibling || slides[0]; // Loop back to start
  const currentDot = dotsNav.querySelector(".current-slide");
  const nextDot = currentDot.nextElementSibling || dots[0]; // Loop back to start dot
  const nextIndex = slides.findIndex((slide) => slide === nextSlide);

  moveToSlide(track, currentSlide, nextSlide);
  updateDots(currentDot, nextDot);
  hideShowArrows(slides, prevButton, nextButton, nextIndex);
}, 5000); // Change slide every 3000 ms (3 seconds)

const pauseCarousel = () => {
  clearInterval(slideInterval);
};

const resumeCarousel = () => {
  slideInterval = setInterval(moveToNextSlide, 5000);
};

// Event listeners for mouse enter and leave
track.addEventListener("mouseenter", pauseCarousel);
track.addEventListener("mouseleave", resumeCarousel);

prevButton.classList.add("is-hidden");

prevButton.addEventListener("click", (e) => {
  const currentSlide = track.querySelector(".current-slide");
  const prevSlide = currentSlide.previousElementSibling;
  const currentDot = dotsNav.querySelector(".current-slide");
  const prevDot = currentDot.previousElementSibling;
  const prevIndex = slides.findIndex((slide) => slide === prevSlide);

  moveToSlide(track, currentSlide, prevSlide);
  updateDots(currentDot, prevDot);
  hideShowArrows(slides, prevButton, nextButton, prevIndex);
});

nextButton.addEventListener("click", (e) => {
  const currentSlide = track.querySelector(".current-slide");
  const nextSlide = currentSlide.nextElementSibling;
  const currentDot = dotsNav.querySelector(".current-slide");
  const nextDot = currentDot.nextElementSibling;
  const nextIndex = slides.findIndex((slide) => slide === nextSlide);

  moveToSlide(track, currentSlide, nextSlide);
  updateDots(currentDot, nextDot);
  hideShowArrows(slides, prevButton, nextButton, nextIndex);
});

dotsNav.addEventListener("click", (e) => {
  const targetDot = e.target.closest("button");

  if (!targetDot) return;

  const currentSlide = track.querySelector(".current-slide");
  const currentDot = dotsNav.querySelector(".current-slide");
  const targetIndex = dots.findIndex((dot) => dot === targetDot);
  const targetSlide = slides[targetIndex];

  moveToSlide(track, currentSlide, targetSlide);
  updateDots(currentDot, targetDot);

  hideShowArrows(slides, prevButton, nextButton, targetIndex);
});

// filter function

document.addEventListener("DOMContentLoaded", function () {
  const filterBtns = document.querySelectorAll(".btn-filter");
  const workTiles1 = document.querySelector(".work-tiles-1");
  const workTiles2 = document.querySelector(".work-tiles-2");
  let activeFilter = null;

  // Store initial state of tiles with their container and grid area
  const originalTiles = [...document.querySelectorAll(".work-tile")].map(
    (tile) => ({
      element: tile,
      parent: tile.parentNode,
      gridArea: tile.classList.contains("gtop")
        ? "gtop"
        : tile.classList.contains("gbottom")
        ? "gbottom"
        : "gside",
    })
  );

  filterBtns.forEach((button) => {
    button.addEventListener("click", function () {
      const filterValue = this.getAttribute("data-filter");

      if (activeFilter === filterValue) {
        // Deactivate filter
        this.classList.remove("active");
        const img = this.querySelector(".button-img");
        img.src = "/img/Button_filter_unselected.svg";
        activeFilter = null;
        resetTiles();
      } else {
        // Activate filter and update state
        filterBtns.forEach((btn) => {
          btn.classList.remove("active");
          const img = btn.querySelector(".button-img");
          img.src = "/img/Button_filter_unselected.svg";
        });
        this.classList.add("active");
        const img = this.querySelector(".button-img");
        img.src = "/img/Button_filter_selected.svg";
        activeFilter = filterValue;
        filterAndRearrangeTiles(filterValue);
      }
    });
  });

  // reset tiles per filter function

  function resetTiles() {
    // Restore all tiles to their original containers and order
    originalTiles.forEach((item) => {
      item.parent.appendChild(item.element);
      item.element.style.display = ""; // Ensure tile is visible
    });
  }

  function filterAndRearrangeTiles(filter) {
    const filteredTiles = originalTiles.filter(
      (item) => item.element.dataset.category === filter
    );

    // Clear existing tiles in both containers
    workTiles1.innerHTML = "";
    workTiles2.innerHTML = "";

    // Distribute filtered tiles trying to fill up each container by grid area
    const areas = { gtop: [], gbottom: [], gside: [] };
    filteredTiles.forEach((item) => areas[item.gridArea].push(item.element));

    const fillOrder = ["gtop", "gside", "gbottom"]; // Example fill order, adjust based on your layout needs
    fillOrder.forEach((area) => {
      areas[area].forEach((tile) => {
        if (workTiles1.querySelectorAll(".work-tile").length < 3) {
          // Assuming 3 tiles fit in one container
          workTiles1.appendChild(tile);
        } else {
          workTiles2.appendChild(tile);
        }
      });
    });
  }
});

// scroll to top function

function topFunction() {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const distanceToTop = -scrollTop;
  const duration = 500;
  const startTime = performance.now();

  function animateScroll(currentTime) {
    const elapsedTime = currentTime - startTime;
    const progress = Math.min(elapsedTime / duration, 1);
    const newPosition = scrollTop + distanceToTop * progress;
    window.scrollTo(0, newPosition);
    if (progress < 1) {
      requestAnimationFrame(animateScroll);
    }
  }

  requestAnimationFrame(animateScroll);
}

// Responsive class update function

function updateClasses() {
  // Select container elements by their specific classes
  const tilesContainer1 = document.querySelector(".tile-1");
  const tilesContainer2 = document.querySelector(".tile-2");
  const footerbody1 = document.querySelector(".fbody-1");
  const footerbody2 = document.querySelector(".fbody-2");

  const allTiles = document.querySelectorAll(".work-tile"); // Selects all '.work-tile' elements
  if (window.innerWidth < 1280) {
    // Apply changes for smaller screens
    allTiles.forEach((tile) => {
      // Remove 'gtop', 'gbottom', 'gside' classes and add 'uniform'
      tile.classList.remove("gtop", "gbottom", "gside");
      tile.classList.add("uniform");
    });

    // Change class names for responsiveness
    if (tilesContainer1) {
      tilesContainer1.classList.remove("work-tiles-1");
      tilesContainer1.classList.add("work-tiles-0");
    }
    if (tilesContainer2) {
      tilesContainer2.classList.remove("work-tiles-2");
      tilesContainer2.classList.add("work-tiles-0");
    }
    if (footerbody1) {
      footerbody1.classList.remove("fgbody-1");
      footerbody1.classList.add("fgbody-01");
    }
    if (footerbody2) {
      footerbody2.classList.remove("fgbody-2");
      footerbody2.classList.add("fgbody-02");
    }
  } else {
    // Restore classes for larger screens
    allTiles.forEach((tile) => {
      // Remove 'uniform' and restore the appropriate size and group classes
      tile.classList.remove("uniform");
      tile.classList.add(tile.classList.contains("side") ? "medium" : "small");
      tile.classList.add(
        tile.classList.contains("top1")
          ? "gtop"
          : tile.classList.contains("bottom1")
          ? "gbottom"
          : "gside"
      );
    });

    // Restore the original class names to the container elements
    if (tilesContainer1) {
      tilesContainer1.classList.remove("work-tiles-0");
      tilesContainer1.classList.add("work-tiles-1");
    }
    if (tilesContainer2) {
      tilesContainer2.classList.remove("work-tiles-0");
      tilesContainer2.classList.add("work-tiles-2");
    }
    if (footerbody1) {
      footerbody1.classList.remove("fgbody-01");
      footerbody1.classList.add("fgbody-1");
    }
    if (footerbody2) {
      footerbody2.classList.remove("fgbody-02");
      footerbody2.classList.add("fgbody-2");
    }
  }
}

// More responsive handling using ResizeObserver
const resizeObserver = new ResizeObserver((entries) => {
  updateClasses();
});
resizeObserver.observe(document.body);

// Menu toggle function
function toggleMenu() {
  const navbar = document.querySelector(".navbar");
  const container = document.getElementById("navcontainer");
  const menu = document.getElementById("menu");
  const logoImage = document.getElementById("logoImage");
  const menuLinks = menu.querySelectorAll(".header-btn-1");

  navbar.classList.toggle("menu-open");
  menu.classList.toggle("active");
  container.classList.toggle("full-width");

  if (navbar.classList.contains("menu-open")) {
    // Change logo to the "menu open" version
    logoImage.src = "/img/Logo-white.svg"; // Replace with your white logo path

    // Add button-like appearance to menu links
    menuLinks.forEach((link) => {
      link.classList.add("button-like");
    });
  } else {
    // Change logo back to the original version
    logoImage.src = "/img/Logo.svg"; // Your original logo path

    // Remove button-like appearance from menu links
    menuLinks.forEach((link) => {
      link.classList.remove("button-like");
    });
  }
}

// Add click event listeners to menu links
document.getElementById("menu").addEventListener("click", function (event) {
  if (event.target.classList.contains("header-btn-1")) {
    event.preventDefault();

    // Remove 'selected' class from all links
    this.querySelectorAll(".header-btn-1").forEach((link) => {
      link.classList.remove("selected");
    });

    // Add 'selected' class to clicked link
    event.target.classList.add("selected");

    // Navigate to the href of the clicked link
    setTimeout(() => {
      window.location.href = event.target.getAttribute("href");
    }, 300); // Delay navigation to allow for visual feedback
  }
});

// filter carousel function
document.addEventListener("DOMContentLoaded", function () {
  const carousel = document.getElementById("filter-carousel");
  let isDown = false;
  let startX;
  let scrollLeft;

  function checkWidth() {
    if (window.innerWidth <= 1280) {
      carousel.addEventListener("mousedown", handleMouseDown);
      carousel.addEventListener("mouseleave", handleMouseLeave);
      carousel.addEventListener("mouseup", handleMouseUp);
      carousel.addEventListener("mousemove", handleMouseMove);
      carousel.addEventListener("touchstart", handleTouchStart);
      carousel.addEventListener("touchend", handleTouchEnd);
      carousel.addEventListener("touchmove", handleTouchMove);
    } else {
      carousel.removeEventListener("mousedown", handleMouseDown);
      carousel.removeEventListener("mouseleave", handleMouseLeave);
      carousel.removeEventListener("mouseup", handleMouseUp);
      carousel.removeEventListener("mousemove", handleMouseMove);
      carousel.removeEventListener("touchstart", handleTouchStart);
      carousel.removeEventListener("touchend", handleTouchEnd);
      carousel.removeEventListener("touchmove", handleTouchMove);
    }
  }

  function handleMouseDown(e) {
    isDown = true;
    carousel.classList.add("active");
    startX = e.pageX - carousel.offsetLeft;
    scrollLeft = carousel.scrollLeft;
  }

  function handleMouseLeave() {
    isDown = false;
    carousel.classList.remove("active");
  }

  function handleMouseUp() {
    isDown = false;
    carousel.classList.remove("active");
  }

  function handleMouseMove(e) {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - carousel.offsetLeft;
    const walk = (x - startX) * 2; // Adjust the scroll speed
    carousel.scrollLeft = scrollLeft - walk;
  }

  function handleTouchStart(e) {
    isDown = true;
    startX = e.touches[0].pageX - carousel.offsetLeft;
    scrollLeft = carousel.scrollLeft;
  }

  function handleTouchEnd() {
    isDown = false;
  }

  function handleTouchMove(e) {
    if (!isDown) return;
    const x = e.touches[0].pageX - carousel.offsetLeft;
    const walk = (x - startX) * 2; // Adjust the scroll speed
    carousel.scrollLeft = scrollLeft - walk;
  }

  window.addEventListener("resize", checkWidth);
  checkWidth();
});

// Email Modal

const modal = document.querySelector(".modal");
const openModal = document.querySelectorAll(".open-button");
const closeModal = document.querySelector(".close-button");

closeModal.disabled = false;

openModal.forEach((button) => {
  button.addEventListener("click", () => {
    modal.showModal();
  });
});

closeModal.addEventListener("click", () => {
  modal.close();
});

//  Image Protection

document.addEventListener(
  "contextmenu",
  function (e) {
    if (e.target.tagName === "IMG") {
      e.preventDefault();
      alert("Right-clicking on images is disabled");
    }
  },
  false
);
