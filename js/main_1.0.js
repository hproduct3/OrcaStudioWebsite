// window.onscroll = () => {
//     var navbar = document.getElementById("navbar");
//     if (document.body.scrollTop > window.innerHeight - 120 || document.documentElement.scrollTop > window.innerHeight - 120) {
//         navbar.classList.add("scrolled");
//     } else {
//         navbar.classList.remove("scrolled");
//     }
// }

const track = document.querySelector('.carousel-images');
const slides = Array.from(track.children);
const nextButton = document.querySelector('.carousel-button-right');
const prevButton = document.querySelector('.carousel-button-left');
const dotsNav = document.querySelector('.carousel-nav');
const dots= Array.from(dotsNav.children);




const slideWidth = slides[0].getBoundingClientRect().width;


const setSlidePosition = (slide, index) => {
    slide.style.left = slideWidth * index + 'px' ;
};
slides.forEach(setSlidePosition);

const moveToSlide = (track, currentSlide, targetSlide) => {
    track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
    currentSlide.classList.remove('current-slide');
    targetSlide.classList.add('current-slide');
}

prevButton.addEventListener('click', e => {
    const currentSlide = track.querySelector('.current-slide');
    const prevSlide = currentSlide.previousElementSibling; 
    moveToSlide(track, currentSlide, prevSlide);
});


nextButton.addEventListener('click', e => {
    const currentSlide = track.querySelector('.current-slide');
    const nextSlide = currentSlide.nextElementSibling; 
    moveToSlide(track, currentSlide, nextSlide);
});



// custom cursor

// const carouselContainer = document.querySelector('.background-image-container');
// const customCursor = document.querySelector('.custom-cursor');

// carouselContainer.addEventListener('mousemove', (event) => {
//   const halfWidth = carouselContainer.offsetWidth / 2;
//   customCursor.style.left = `${event.clientX}px`;
//   customCursor.classList.remove('right'); // Reset arrow style before checking position
//   if (event.clientX < halfWidth) {
//     customCursor.classList.add('right'); // Add right arrow style for left half
//   }
// });

// carouselContainer.addEventListener('click', () => {
//   customCursor.style.opacity = 1; // Maintain opacity after click (optional)
//   // Handle carousel navigation logic here (replace with your actual code)
//   console.log('Carousel clicked!');
// });




const cursor = document.querySelector('.custom-cursor');

document.addEventListener('mousemove', (event) => {
    cursor.style.left = event.clientX + 'px';
    cursor.style.top = event.clientY + 'px';
});

document.addEventListener('click', () => {
    cursor.classList.toggle('clicked'); // Toggle click effect on cursor
});




// document.addEventListener("DOMContentLoaded", function() {
//     const images = document.querySelectorAll(".carousel-images img");
//     const dotsContainer = document.querySelector(".carousel-dots");
//     const arrowRight = document.querySelector(".carousel-arrow-right");
//     let currentIndex = 0;



// let slideIndex = 0;
// function showSlides() {
//     let i;
//     let slides = document.querySelectorAll('.carousel-images img');
//     for (i = 0; i < slides.length; i++) {
//         slides[i].style.display = "none";
//     }
//     slideIndex++;
//     if (slideIndex > slides.length) { slideIndex = 1 }
//     slides[slideIndex - 1].style.display = "block";
//     setTimeout(showSlides, 10000);
// }

// showSlides();




//     function updateCarousel() {
//         images.forEach((img, index) => {
//             img.style.display = index === currentIndex ? "block" : "none";
//         });
//         updateDots();
//     }

//     function updateDots() {
//         dotsContainer.innerHTML = "";
//         images.forEach((_, index) => {
//             const dot = document.createElement("div");
//             dot.className = "carousel-dot" + (index === currentIndex ? " active" : "");
//             dot.addEventListener("click", () => {
//                 currentIndex = index;
//                 updateCarousel();
//             });
//             dotsContainer.appendChild(dot);
//         });
//     }

//     arrowRight.addEventListener("click", () => {
//         currentIndex = (currentIndex + 1) % images.length;
//         updateCarousel();
//     });

//     document.querySelector(".carousel").addEventListener("mouseover", () => {
//         arrowRight.style.display = "block";
//     });

//     document.querySelector(".carousel").addEventListener("mouseout", () => {
//         arrowRight.style.display = "none";
//     });

//     updateCarousel(); // Initialize the carousel
// });



/*
const workTiles = document.getElementById("work-tiles");
const filterBtns = document.querySelectorAll(".btn-filter");

let activeFilter = '';


let allTiles = Array.from(document.querySelectorAll('.work-tiles .work-tile'));
const workTilesContainer = document.querySelector('.work-tiles');
let activeFilter = '';

/*

filterBtns.forEach(button => {
    button.addEventListener('click', () => {
        const filter = button.getAttribute('data-filter');
        console.log(filter);
        workTiles.innerHTML = "";
        allTiles.forEach(tile => {
            if (tile.getAttribute('data-category') === filter) {
                workTilesContainer.appendChild(tile);
            }
        });
    });
});
*/
const workTilesContainer = document.getElementById("work-tiles"); // This should be the container
const filterBtns = document.querySelectorAll(".btn-filter");
const workTiles = workTilesContainer.querySelectorAll(".work-tile"); // Assuming your items have the class "work-tile"

let activeFilter = '';

filterBtns.forEach(button => {
    button.addEventListener('click', function () { // Using function() to correctly use 'this'
        const alreadyActive = this.classList.contains('active');
        filterBtns.forEach(btn => btn.classList.remove('active'));

        // Toggle filter off if the same button was clicked
        if (alreadyActive) {
            activeFilter = '';
            workTiles.forEach(tile => tile.style.display = "flex");
        } else {
            this.classList.add('active');
            const filterValue = this.getAttribute('data-filter');
            activeFilter = filterValue;

            workTiles.forEach(tile => {
                if (tile.getAttribute('data-category') === filterValue) {
                    tile.style.display = 'flex';
                } else {
                    tile.style.display = 'none';
                }
            });
        }
    });
});



