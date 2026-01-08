// Scripts for projects page
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