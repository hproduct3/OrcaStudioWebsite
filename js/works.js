document.addEventListener('DOMContentLoaded', function () {
    const filterBtns = document.querySelectorAll(".btn-filter");
    const workTilesContainer = document.querySelector(".work-tiles-square");
    let activeFilter = null;

    // Store initial state of tiles with their container
    const originalTiles = [...document.querySelectorAll(".work-tile")].map(tile => ({
        element: tile,
        parent: tile.parentNode,
    }));

    filterBtns.forEach(button => {
        button.addEventListener('click', function () {
            const filterValue = this.getAttribute('data-filter');

            if (activeFilter === filterValue) {
                // Deactivate filter
                this.classList.remove('active');
                const img = this.querySelector('.button-img');
                img.src = "/img/Button_filter_unselected.svg";
                activeFilter = null;
                resetTiles();
            } else {
                // Activate filter and update state
                filterBtns.forEach(btn => {
                    btn.classList.remove('active');
                    const img = btn.querySelector('.button-img');
                    img.src = "/img/Button_filter_unselected.svg";
                });
                this.classList.add('active');
                const img = this.querySelector('.button-img');
                img.src = "/img/Button_filter_selected.svg";
                activeFilter = filterValue;
                filterAndRearrangeTiles(filterValue);
            }
        });
    });

    function resetTiles() {
        // Restore all tiles to their original containers and order
        originalTiles.forEach(item => {
            item.parent.appendChild(item.element);
            item.element.style.display = ''; // Ensure tile is visible
        });
    }

    function filterAndRearrangeTiles(filter) {
        const filteredTiles = originalTiles.filter(item => item.element.dataset.category === filter);

        // Clear existing tiles in the container
        workTilesContainer.innerHTML = '';

        // Append filtered tiles to the container
        filteredTiles.forEach(item => {
            workTilesContainer.appendChild(item.element);
        });
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

// function updateClasses() {
//     const tilesContainer1 = document.querySelector('.work-tiles-1');
//     const tilesContainer2 = document.querySelector('.work-tiles-2');
//     const allTiles = document.querySelectorAll('.work-tile'); // This selects all '.work-tile' elements

//     if (window.innerWidth < 1280) {
//         // Apply changes for smaller screens
//         allTiles.forEach(function(tile) {
//             // Remove 'gtop', 'gbottom', 'gside'
//             tile.classList.remove('gtop', 'gbottom', 'gside');

//             // Change class to 'uniform'
//             if (tile.classList.contains('medium') || tile.classList.contains('small')) {
//                 tile.classList.remove('medium', 'small');
//                 tile.classList.add('uniform');
//             }
//         });
//         if (tilesContainer1) {
//             tilesContainer1.classList.remove('work-tiles-1');
//             tilesContainer1.classList.add('work-tiles-0');
//         }
//         if (tilesContainer2) {
//             tilesContainer2.classList.remove('work-tiles-2');
//             tilesContainer2.classList.add('work-tiles-0');
//         }
//     } else {
//         // Restore classes for larger screens
//         allTiles.forEach(function(tile) {
//             // Remove 'uniform' and restore 'medium' or 'small'
//             if (tile.classList.contains('uniform')) {
//                 tile.classList.remove('uniform');
//                 // Determine the appropriate class to restore based on 'data-category'
//                 tile.classList.add(tile.dataset.category === 'architecture' ? 'medium' : 'small');
//             }

//             // Restore 'gtop', 'gbottom', 'gside' as appropriate
//             if (tile.dataset.category === 'architecture') {
//                 if (tile.classList.contains('medium')) {
//                     tile.classList.add('gside');
//                 } else if (tile.classList.contains('small')) {
//                     tile.classList.add('gtop');
//                 }
//             } else if (tile.dataset.category === 'product') {
//                 if (tile.classList.contains('small')) {
//                     tile.classList.add('gbottom');
//                 }
//             }
//         });
//         if (tilesContainer1) {
//             tilesContainer1.classList.remove('work-tiles-0');
//             tilesContainer1.classList.add('work-tiles-1');
//         }
//         if (tilesContainer2) {
//             tilesContainer2.classList.remove('work-tiles-0');
//             tilesContainer2.classList.add('work-tiles-2');
//         }
//     }
// }

// // Event listeners for resize and load events
// window.addEventListener('resize', updateClasses);
// window.addEventListener('load', updateClasses);

function updateClasses() {
    // Select container elements by their specific classes
    const tilesContainer1 = document.querySelector('.tile-1');
    const tilesContainer2 = document.querySelector('.tile-2');
    const footerbody1 = document.querySelector('.fbody-1');
    const footerbody2 = document.querySelector('.fbody-2');


    
    const allTiles = document.querySelectorAll('.work-tile'); // Selects all '.work-tile' elements
    if (window.innerWidth < 1280) {
        // Apply changes for smaller screens
        allTiles.forEach(tile => {
            // Remove 'gtop', 'gbottom', 'gside' classes and add 'uniform'
            tile.classList.remove('gtop', 'gbottom', 'gside');
            tile.classList.add('uniform');
        });

        // Change class names for responsiveness
        if (tilesContainer1) {
            tilesContainer1.classList.remove('work-tiles-1');
            tilesContainer1.classList.add('work-tiles-0');
        }
        if (tilesContainer2) {
            tilesContainer2.classList.remove('work-tiles-2');
            tilesContainer2.classList.add('work-tiles-0');
        }
        if (footerbody1) {
            footerbody1.classList.remove('fgbody-1');
            footerbody1.classList.add('fgbody-01');
        }
        if (footerbody2) {
            footerbody2.classList.remove('fgbody-2');
            footerbody2.classList.add('fgbody-02');
        }
    } else {
        // Restore classes for larger screens
        allTiles.forEach(tile => {
            // Remove 'uniform' and restore the appropriate size and group classes
            tile.classList.remove('uniform');
            tile.classList.add(tile.classList.contains('side') ? 'medium' : 'small');
            tile.classList.add(tile.classList.contains('top1') ? 'gtop' : (tile.classList.contains('bottom1') ? 'gbottom' : 'gside'));
        });

        // Restore the original class names to the container elements
        if (tilesContainer1) {
            tilesContainer1.classList.remove('work-tiles-0');
            tilesContainer1.classList.add('work-tiles-1');
        }
        if (tilesContainer2) {
            tilesContainer2.classList.remove('work-tiles-0');
            tilesContainer2.classList.add('work-tiles-2');
        }
        if (footerbody1) {
            footerbody1.classList.remove('fgbody-01');
            footerbody1.classList.add('fgbody-1');
        }
        if (footerbody2) {
            footerbody2.classList.remove('fgbody-02');
            footerbody2.classList.add('fgbody-2');
        }
    }
}

// More responsive handling using ResizeObserver
const resizeObserver = new ResizeObserver(entries => {
    updateClasses();
});
resizeObserver.observe(document.body);



// Menu toggle function
function toggleMenu() {
    const menu = document.getElementById('menu');
    menu.classList.toggle('active');
}


// filter carousel function
document.addEventListener('DOMContentLoaded', function () {
    const carousel = document.getElementById('filter-carousel');
    let isDown = false;
    let startX;
    let scrollLeft;

    function checkWidth() {
        if (window.innerWidth <= 1280) {
            carousel.addEventListener('mousedown', handleMouseDown);
            carousel.addEventListener('mouseleave', handleMouseLeave);
            carousel.addEventListener('mouseup', handleMouseUp);
            carousel.addEventListener('mousemove', handleMouseMove);
            carousel.addEventListener('touchstart', handleTouchStart);
            carousel.addEventListener('touchend', handleTouchEnd);
            carousel.addEventListener('touchmove', handleTouchMove);
        } else {
            carousel.removeEventListener('mousedown', handleMouseDown);
            carousel.removeEventListener('mouseleave', handleMouseLeave);
            carousel.removeEventListener('mouseup', handleMouseUp);
            carousel.removeEventListener('mousemove', handleMouseMove);
            carousel.removeEventListener('touchstart', handleTouchStart);
            carousel.removeEventListener('touchend', handleTouchEnd);
            carousel.removeEventListener('touchmove', handleTouchMove);
        }
    }

    function handleMouseDown(e) {
        isDown = true;
        carousel.classList.add('active');
        startX = e.pageX - carousel.offsetLeft;
        scrollLeft = carousel.scrollLeft;
    }

    function handleMouseLeave() {
        isDown = false;
        carousel.classList.remove('active');
    }

    function handleMouseUp() {
        isDown = false;
        carousel.classList.remove('active');
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

    window.addEventListener('resize', checkWidth);
    checkWidth();
});


