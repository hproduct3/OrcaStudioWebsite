

// real time clock
function formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
}

document.addEventListener('DOMContentLoaded', (event) => {
    const currentDate = new Date();
    const formattedDate = formatDate(currentDate);
    document.getElementById('currentDate').textContent = formattedDate;

    const workTile = document.querySelector('.work-tile');
        const category = workTile.getAttribute('data-category');
        document.getElementById('currentCategory').textContent = category;
});



// load projects


const projects = {
    "project-one": {
        title: "An always-improving super assistant for every member of your team",
        description: "Generate better code, craft emails, analyze data, and supercharge any type of work in a collaborative team workspace.",
        tiles: [
            { imageUrl: "/img/Hero-Image-temp-4.png", description: "Get insights from documents and datasets in any format" },
            { imageUrl: "/img/Hero-Image-temp-3.png", description: "Description for tile two." },
            // Add more tiles here
        ]
    },
    "project-two": {
        title: "Project Two",
        description: "Overview for project two.",
        tiles: [
            { imageUrl: "project2_tile1.jpg", description: "Description for tile one." },
            { imageUrl: "project2_tile2.jpg", description: "Description for tile two." },
            // Add more tiles here
        ]
    },
    "project-three": {
        title: "Project Three",
        description: "Overview for project two.",
        tiles: [
            { imageUrl: "project2_tile1.jpg", description: "Description for tile one." },
            { imageUrl: "project2_tile2.jpg", description: "Description for tile two." },
            // Add more tiles here
        ]
    },
    "project-four": {
        title: "Project Four",
        description: "Overview for project two.",
        tiles: [
            { imageUrl: "project2_tile1.jpg", description: "Description for tile one." },
            { imageUrl: "project2_tile2.jpg", description: "Description for tile two." },
            // Add more tiles here
        ]
    },
    "project-five": {
        title: "Project Five",
        description: "Overview for project two.",
        tiles: [
            { imageUrl: "project2_tile1.jpg", description: "Description for tile one." },
            { imageUrl: "project2_tile2.jpg", description: "Description for tile two." },
            // Add more tiles here
        ]
    },
    "project-six": {
        title: "Project Six",
        description: "Overview for project two.",
        tiles: [
            { imageUrl: "project2_tile1.jpg", description: "Description for tile one." },
            { imageUrl: "project2_tile2.jpg", description: "Description for tile two." },
            // Add more tiles here
        ]
    },
    // Add more projects here
};

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
    const params = getQueryParams();
    const projectId = params.id;
    const project = projects[projectId];

    if (project) {
        const projectContainer = document.getElementById('project-container');
        
        const projectHeader = document.createElement('div');
        projectHeader.classList.add('project-header');
        
        const projectTitle = document.createElement('h1');
        projectTitle.classList.add('project-title');
        projectTitle.textContent = project.title;
        
        const projectDescription = document.createElement('h4');
        projectDescription.classList.add('project-description');
        projectDescription.textContent = project.description;
        
        projectHeader.appendChild(projectTitle);
        projectHeader.appendChild(projectDescription);
        projectContainer.appendChild(projectHeader);

        project.tiles.forEach(tile => {
            const tileElement = document.createElement('div');
            tileElement.classList.add('project-tile');

            const tileImagecontainer = document.createElement('div');
            tileImagecontainer.classList.add('tile-image-container');

            const tileImage = document.createElement('img');
            tileImage.src = tile.imageUrl;
            tileImage.alt = tile.description;
            tileImage.classList.add('tile-image');

            const tileDescription = document.createElement('p');
            tileDescription.classList.add('tile-description');
            tileDescription.textContent = tile.description;

            tileElement.appendChild(tileImagecontainer);
            tileImagecontainer.appendChild(tileImage);
            tileElement.appendChild(tileDescription);
            projectContainer.appendChild(tileElement);
        });
    } else {
        const projectContainer = document.getElementById('project-container');
        projectContainer.textContent = "Project not found.";
    }
}

window.onload = loadProject;


// carousel

document.addEventListener('DOMContentLoaded', () => {
    const track = document.getElementById('work-tiles');
    const nextButton = document.querySelector('.carousel-next');
    const prevButton = document.querySelector('.carousel-prev');
    const slides = Array.from(track.children);
    const slideWidth = 640 + 24; // Slide width + margin

    // Function to handle next button click
    nextButton.addEventListener('click', () => {
        const maxScrollLeft = track.scrollWidth - track.clientWidth;
        const newScrollLeft = Math.min(track.scrollLeft + slideWidth, maxScrollLeft);

        track.scrollTo({
            left: newScrollLeft,
            behavior: 'smooth'
        });
    });

    // Function to handle previous button click
    prevButton.addEventListener('click', () => {
        const newScrollLeft = Math.max(track.scrollLeft - slideWidth, 0);

        track.scrollTo({
            left: newScrollLeft,
            behavior: 'smooth'
        });
    });
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
    
    const footerbody1 = document.querySelector('.fbody-1');
    const footerbody2 = document.querySelector('.fbody-2');


    
    const allTiles = document.querySelectorAll('.work-tile'); // Selects all '.work-tile' elements
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


