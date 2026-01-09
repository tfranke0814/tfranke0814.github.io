// Scripts for projects page
const projectSlugs = ["optcg-analyzer", "econ-forecast", "sir-implementation"];

Promise.all(projectSlugs.map(fetchProject))
  .then(initModals)
  .catch(err => console.error("Error initializing project page:", err));

  
// Functions
// Load project cards
function fetchProject(name) {
    "Assumes filename and elt id are the same"
    return fetch(`./project-cards/${name}.html`)
    .then(res => res.text())
    .then(html => {document.getElementById(name).innerHTML = html})
    .catch(err => console.error(`Error loading project ${name}:`, err));
}

// Project Modals
function initModals() {
    const readMoreBtns = document.querySelectorAll('.read-more-btn');
    const closeModalBtns = document.querySelectorAll('.close-modal-btn')

    readMoreBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            modal = document.getElementById(btn.id + "-modal");
            modal.classList.remove('hidden');
        });
    });

    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            modal = document.getElementById(btn.id + "-modal");
            modal.classList.add('hidden');
        });
    });

    // Close nav with outside click or escape
    document.addEventListener('click', (e) => {
        const visibleModals = document.querySelectorAll('.project-modal:not(.hidden)');
        visibleModals.forEach(modal => {
            if (e.target === modal) modal.classList.add('hidden');
        });
    });

    document.addEventListener('keydown', (e) => {
        const visibleModals = document.querySelectorAll('.project-modal:not(.hidden)');
        visibleModals.forEach(modal => {
            if (e.key === "Escape") {
                modal.classList.add('hidden');
        }});
    });
}