// main script for footer and navbar header menu
// functions
function setActiveNavItem() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('nav a');
    
    // Remove active class from all links
    navLinks.forEach(link => link.classList.remove('active'));
    
    // Add active class to current page link
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPath || (currentPath.startsWith(href) && href !== '/')) {
            link.classList.add('active');
        }
    });
}

function initStickyHeaderMenu() {
    const btn = document.querySelector(".menu-toggle");
    const header = document.querySelector(".sticky-header");
    if (!btn || !header) return;

    // Dropdown menu toggle for mobile
    btn.addEventListener("click", (e) => {
        const isOpen = btn.getAttribute("aria-expanded") === "true";
        btn.setAttribute("aria-expanded", String(!isOpen));
        header.classList.toggle("nav-open", !isOpen);
        e.stopPropagation();
    });

    // Close dropdown on resize if open
    window.addEventListener("resize", () => {
        if (
        window.innerWidth > 768 &&
        header.classList.contains("nav-open")
        ) {
        header.classList.remove("nav-open");
        btn.setAttribute("aria-expanded", "false");
        }
    });

    // Close dropdown on outside click or Escape key
    document.addEventListener("click", (e) => {
        if (!header.classList.contains("nav-open")) return;
        if (header.contains(e.target)) return;
        header.classList.remove("nav-open");
        btn.setAttribute("aria-expanded", "false");
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && header.classList.contains("nav-open")) {
        header.classList.remove("nav-open");
        btn.setAttribute("aria-expanded", "false");
        btn.focus();
        }
    });
}

// load navbar and footer
fetch("/includes/navbar.html")
.then((response) => response.text())
.then((html) => {
    document.getElementById("navbar-placeholder").innerHTML = html;
    setActiveNavItem();
    initStickyHeaderMenu();
});

fetch("/includes/footer.html")
.then((response) => response.text())
.then((html) => {
    document.getElementById("footer-placeholder").innerHTML = html;
})
.catch((error) => console.error("Error loading footer:", error));

// Sticky header scroll effect
window.addEventListener("scroll", function () {
    const header = document.getElementById("stickyHeader");
    if (window.scrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});