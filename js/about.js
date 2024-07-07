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
    // Restore classes for larger screens

    // Restore the original class names to the container elements

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
