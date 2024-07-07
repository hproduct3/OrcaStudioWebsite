document.addEventListener("DOMContentLoaded", function () {
  const filterBtns = document.querySelectorAll(".btn-filter");
  const workTilesContainer = document.querySelector(".work-tiles-square");
  let activeFilter = null;

  // Store initial state of tiles with their container
  const originalTiles = [...document.querySelectorAll(".work-tile")].map(
    (tile) => ({
      element: tile,
      parent: tile.parentNode,
    })
  );

  // Function to apply filter programmatically
  function applyFilter(filterValue) {
    const targetButton = [...filterBtns].find(
      (btn) => btn.getAttribute("data-filter") === filterValue
    );
    if (targetButton) {
      // Deactivate all filters
      filterBtns.forEach((btn) => {
        btn.classList.remove("active");
        const img = btn.querySelector(".button-img");
        img.src = "/img/Button_filter_unselected.svg";
      });

      // Activate this filter
      targetButton.classList.add("active");
      const img = targetButton.querySelector(".button-img");
      img.src = "/img/Button_filter_selected.svg";
      activeFilter = filterValue;
      filterAndRearrangeTiles(filterValue);
    }
  }

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
        applyFilter(filterValue);
      }
    });
  });

  function resetTiles() {
    // Restore all tiles to their original containers and order
    originalTiles.forEach((item) => {
      item.parent.appendChild(item.element);
      item.element.style.display = ""; // Ensure tile is visible
    });
  }

  function filterAndRearrangeTiles(filter) {
    const filteredTiles = originalTiles.filter((item) => {
      const categories = item.element.dataset.category.split(" ");
      return categories.includes(filter);
    });

    // Clear existing tiles in the container
    workTilesContainer.innerHTML = "";

    // Append filtered tiles to the container
    filteredTiles.forEach((item) => {
      workTilesContainer.appendChild(item.element);
    });
  }

  // Check URL parameters to apply the filter if provided
  const urlParams = new URLSearchParams(window.location.search);
  const filterFromURL = urlParams.get("filter");

  // Set your default category here
  const defaultCategory = "product";

  // Apply filter from URL or default category
  if (filterFromURL) {
    applyFilter(filterFromURL);
  } else {
    applyFilter(defaultCategory);
  }
});

// Scroll to top function

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

// update footer class

function updateClasses() {
  // Select container elements by their specific classes

  const footerbody1 = document.querySelector(".fbody-1");
  const footerbody2 = document.querySelector(".fbody-2");

  if (window.innerWidth < 1280) {
    // Apply changes for smaller screens

    // Change class names for responsiveness

    if (footerbody1) {
      footerbody1.classList.remove("fgbody-1");
      footerbody1.classList.add("fgbody-01");
    }
    if (footerbody2) {
      footerbody2.classList.remove("fgbody-2");
      footerbody2.classList.add("fgbody-02");
    }
  } else {
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
