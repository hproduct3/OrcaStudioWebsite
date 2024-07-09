function getQueryParams() {
  const params = {};
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  for (const [key, value] of urlParams) {
    params[key] = value;
  }
  return params;
}

function loadProject() {
  fetch("../projectdata.json")
    .then((response) => response.json())
    .then((projects) => {
      const params = getQueryParams();
      const projectId = params.id;
      const project = projects[projectId];

      if (project) {
        const projectContainer = document.getElementById("project-container");

        // Top Text Band
        const projectCateContainer = document.createElement("div");
        projectCateContainer.classList.add("project-category-container");
        const projectHeader = document.createElement("div");
        projectHeader.classList.add("project-header");
        const projectFooter = document.createElement("div");
        projectFooter.classList.add("project-footer");

        const projectTime = document.createElement("p");
        projectTime.classList.add("project-time");
        projectTime.textContent = project.time;
        const projectCategory = document.createElement("p");
        projectCategory.classList.add("project-category");
        projectCategory.innerHTML = project.category;

        const projectTitle = document.createElement("h1");
        projectTitle.classList.add("project-title");
        projectTitle.textContent = project.title;

        const projectSubTitle = document.createElement("h1");
        projectSubTitle.classList.add("project-subtitle");
        projectSubTitle.textContent = project.subtitle;

        const projectDescription = document.createElement("h4");
        projectDescription.classList.add("project-description");
        projectDescription.textContent = project.description;

        const projectAssociate = document.createElement("h4");
        projectAssociate.classList.add("project-associate");
        projectAssociate.textContent = project.associate;

        const projectQoute = document.createElement("h3");
        projectQoute.classList.add("project-qoute");
        projectQoute.innerHTML = project.qoute;
        // projectQoute.textContent = project.qoute;

        const projectAwards = document.createElement("p");
        projectAwards.classList.add("project-awards");
        projectAwards.textContent = project.awards;

        projectCateContainer.appendChild(projectTime);
        projectCateContainer.appendChild(projectCategory);
        projectHeader.appendChild(projectTitle);
        projectHeader.appendChild(projectSubTitle);
        projectHeader.appendChild(projectDescription);
        projectHeader.appendChild(projectAssociate);
        projectContainer.appendChild(projectCateContainer);
        projectContainer.appendChild(projectHeader);

        // Project tiles
        project.tiles.forEach((tile) => {
          if (tile.type === "slider") {
            // Render slider tile
            const tileElement = document.createElement("div");
            tileElement.classList.add("project-tile-slider");

            const sliderContainer = document.createElement("div");
            sliderContainer.classList.add("slider-container");

            tile.images.forEach((img) => {
              const slide = document.createElement("div");
              slide.classList.add("slide");

              const sliderImage = document.createElement("img");
              sliderImage.src = img.imageUrl;
              sliderImage.alt = tile.description;
              sliderImage.classList.add("slider-image");

              slide.appendChild(sliderImage);
              sliderContainer.appendChild(slide);
            });

            const tileDescription = document.createElement("p");
            tileDescription.classList.add("tile-description");
            tileDescription.textContent = tile.description;
            const tilePhotoCredit = document.createElement("p");
            tilePhotoCredit.classList.add("tile-photo-credit");
            tilePhotoCredit.textContent = tile.photoCredit;

            tileElement.appendChild(sliderContainer);
            tileElement.appendChild(tileDescription);
            tileElement.appendChild(tilePhotoCredit);
            projectContainer.appendChild(tileElement);
          } else if (tile.type === "combo") {
            // Render combo tile
            const tileElement = document.createElement("div");
            tileElement.classList.add("project-tile-combo");

            const comboContainer = document.createElement("div");
            comboContainer.classList.add("combo-container");

            const comboTextContainer = document.createElement("div");
            comboTextContainer.classList.add("combo-text-container");

            const comboMediaContainer = document.createElement("div");
            comboMediaContainer.classList.add("combo-media-container");

            // Add content to comboMediaContainer

            let mediaElement;
            if (tile.videoUrl) {
              mediaElement = document.createElement("video");
              mediaElement.src = tile.videoUrl;
              mediaElement.classList.add("media-mp4");
              mediaElement.muted = true;
              mediaElement.autoplay = true;
              mediaElement.controls = false;
              mediaElement.loop = true;
              mediaElement.addEventListener("loadedmetadata", function () {
                if (this.videoWidth > this.videoHeight) {
                  // Horizontal video
                  this.style.width = "100%";
                  this.style.height = "auto";
                } else {
                  // Vertical video
                  this.style.width = "auto";
                  this.style.height = "100%";
                }
              });

              // Fallback in case metadata doesn't load
              mediaElement.addEventListener("error", function () {
                console.warn(
                  "Video metadata could not be loaded. Defaulting to height 100%."
                );
                this.style.height = "100%";
              });
            } else if (tile.imageUrl) {
              mediaElement = document.createElement("img");
              mediaElement.src = tile.imageUrl;
              mediaElement.classList.add("media-image");
              mediaElement.style.height = "100%";
              mediaElement.alt = tile.imageAlt || ""; // Add alt text for accessibility
            } else {
              console.warn("Neither videoUrl nor imageUrl provided for tile");
            }

            if (mediaElement) {
              comboMediaContainer.appendChild(mediaElement);
            }

            // Add content to comboTextContainer
            const textTitle = document.createElement("h3");
            textTitle.classList.add("text-title");
            textTitle.textContent = tile.descriptionTitle;

            const textContent = document.createElement("p");
            textContent.classList.add("text-content");
            textContent.textContent = tile.descriptionContent;

            comboTextContainer.appendChild(textTitle);
            comboTextContainer.appendChild(textContent);

            const tileDescription = document.createElement("p");
            tileDescription.classList.add("tile-description");
            tileDescription.textContent = tile.description;

            const tilePhotoCredit = document.createElement("p");
            tilePhotoCredit.classList.add("tile-photo-credit");
            tilePhotoCredit.textContent = tile.photoCredit;

            // Combine containers

            comboContainer.appendChild(comboTextContainer);
            comboContainer.appendChild(comboMediaContainer);
            tileElement.appendChild(comboContainer);
            tileElement.appendChild(tileDescription);
            tileElement.appendChild(tilePhotoCredit);
            projectContainer.appendChild(tileElement);
          } else {
            // Default to rendering static tile
            const tileElement = document.createElement("div");
            tileElement.classList.add("project-tile");

            const tileImageContainer = document.createElement("div");
            tileImageContainer.classList.add("tile-image-container");

            let mixMediaElement;
            if (tile.videoUrl) {
              mixMediaElement = document.createElement("video");
              mixMediaElement.src = tile.videoUrl;
              mixMediaElement.classList.add("tile-video");
              mixMediaElement.muted = true;
              mixMediaElement.autoplay = true;
              mixMediaElement.controls = false;
              mixMediaElement.loop = true;
            } else if (tile.imageUrl) {
              mixMediaElement = document.createElement("img");
              mixMediaElement.src = tile.imageUrl;
              mixMediaElement.alt = tile.description;
              mixMediaElement.classList.add("tile-image");
            } else {
              console.warn("Neither videoUrl nor imageUrl provided for tile");
            }

            const tileDescription = document.createElement("p");
            tileDescription.classList.add("tile-description");
            tileDescription.textContent = tile.description;

            const tilePhotoCredit = document.createElement("p");
            tilePhotoCredit.classList.add("tile-photo-credit");
            tilePhotoCredit.textContent = tile.photoCredit;

            tileElement.appendChild(tileImageContainer);
            if (mixMediaElement) {
              tileImageContainer.appendChild(mixMediaElement);
            }
            tileElement.appendChild(tileDescription);
            tileElement.appendChild(tilePhotoCredit);
            projectContainer.appendChild(tileElement);
          }
        });

        // Load Project footer

        projectFooter.appendChild(projectQoute);
        projectFooter.appendChild(projectAwards);
        projectContainer.appendChild(projectFooter);

        // Slideshow functionality
        document.querySelectorAll(".slider-container").forEach((slider) => {
          let sliderIndex = 0;
          showSliderSlides(slider);

          function showSliderSlides(slider) {
            let slides = slider.querySelectorAll(".slide");
            for (let i = 0; i < slides.length; i++) {
              slides[i].style.display = "none";
            }
            sliderIndex++;
            if (sliderIndex > slides.length) {
              sliderIndex = 1;
            }
            if (slides[sliderIndex - 1]) {
              slides[sliderIndex - 1].style.display = "block";
            }
            setTimeout(() => showSliderSlides(slider), 5000); // Change image every 5 seconds
          }
        });
      } else {
        const projectContainer = document.getElementById("project-container");
        projectContainer.textContent = "Project not found.";
      }
    })
    .catch((error) => console.error("Error loading projects:", error));
}

window.onload = loadProject;

// new carousel
document.addEventListener("DOMContentLoaded", () => {
  // Function to get the current project's info
  function getCurrentProjectInfo() {
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get("id");
    return projectId
      ? {
          id: projectId,
          prefix: projectId.split("_")[0], // Assumes format like "project_01"
        }
      : null;
  }

  // Function to load carousel tiles
  function loadCarouselTiles() {
    const currentProject = getCurrentProjectInfo();
    if (!currentProject) return;

    const carouselContainer = document.getElementById("work-tiles");
    const allTiles = document.querySelectorAll(".work-tile");

    allTiles.forEach((tile) => {
      const tileLink = tile.querySelector("a");
      if (tileLink) {
        const tileHref = tileLink.getAttribute("href");
        const tileProjectId = new URLSearchParams(tileHref.split("?")[1]).get(
          "id"
        );

        if (
          tileProjectId &&
          tileProjectId.startsWith(currentProject.prefix) &&
          tileProjectId !== currentProject.id
        ) {
          const clonedTile = tile.cloneNode(true);
          carouselContainer.appendChild(clonedTile);
        }
      }
    });
  }

  // Function to initialize carousel
  function initializeCarousel() {
    const track = document.getElementById("work-tiles");
    const nextButton = document.querySelector(".carousel-next");
    const prevButton = document.querySelector(".carousel-prev");
    const slideWidth = 640 + 24; // Slide width + margin

    nextButton.addEventListener("click", () => {
      const maxScrollLeft = track.scrollWidth - track.clientWidth;
      const newScrollLeft = Math.min(
        track.scrollLeft + slideWidth,
        maxScrollLeft
      );

      track.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      });
    });

    prevButton.addEventListener("click", () => {
      const newScrollLeft = Math.max(track.scrollLeft - slideWidth, 0);

      track.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      });
    });
  }

  // Load tiles and initialize carousel
  loadCarouselTiles();
  initializeCarousel();
});

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

// back to top button

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

function updateClasses() {
  // Select container elements by their specific classes

  const footerbody1 = document.querySelector(".fbody-1");
  const footerbody2 = document.querySelector(".fbody-2");

  const allTiles = document.querySelectorAll(".work-tile"); // Selects all '.work-tile' elements
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

// Load Carousel
document.addEventListener("DOMContentLoaded", function () {
  loadRelatedProjects();
});

function loadRelatedProjects() {
  fetch("../projectdata.json")
    .then((response) => response.json())
    .then((projects) => {
      const params = getQueryParams();
      const projectId = params.id;
      const currentProject = projects[projectId];
      if (!currentProject) {
        console.error("Current project not found");
        return;
      }
      const currentCategory = currentProject["data-category"];

      let relatedProjects;
      if (currentCategory === "photo") {
        // For 'photo' category, include all projects except the current one
        relatedProjects = Object.entries(projects).filter(
          ([id, _]) => id !== projectId
        );
      } else {
        // For other categories, only include projects with the same category
        relatedProjects = Object.entries(projects).filter(
          ([id, project]) =>
            project["data-category"] === currentCategory && id !== projectId
        );
      }

      const carouselContainer = document.getElementById("work-tiles");
      if (!carouselContainer) {
        console.error("Carousel container not found");
        return;
      }
      carouselContainer.innerHTML = ""; // Clear existing content

      relatedProjects.forEach(([id, project]) => {
        const imageUrl = project.thumbnail || "/path/to/default/image.jpg";

        const tileHtml = `
                  <div class="work-tile square" id="tile" data-category="${
                    project["data-category"] || ""
                  }">
                      <a href="projects_temp.html?id=${id}" class="ai">
                          <picture>
                              <img src="${imageUrl}">
                          </picture>
                          <div class="strap">
                              <h3>${project.title || "Untitled Project"}</h3>
                              <h4>${project.subtitle || ""}</h4>
                          </div>
                      </a>
                  </div>
              `;
        carouselContainer.innerHTML += tileHtml;
      });
    })
    .catch((error) => console.error("Error:", error));
}

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


document.querySelectorAll('video').forEach(video => {
  video.addEventListener('error', function(e) {
    console.error('Video error:', this.error, this.src);
  });
});