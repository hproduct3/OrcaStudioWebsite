function updateClasses() {
    // Select container elements by their specific classes
    const footerbody1 = document.querySelector('.fbody-1');
    const footerbody2 = document.querySelector('.fbody-2');
    
    if (window.innerWidth < 1280) {
        // Apply changes for smaller screens
        

        // Change class names for responsiveness
       
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
      

        // Restore the original class names to the container elements
       
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

