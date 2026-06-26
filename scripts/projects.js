// Scripts for projects page
const projectGroups = [
    {
        id: "podcast",
        label: "Podcast",
        projects: ["optcg-analyzer"],
    },
    {
        id: "game-dev",
        label: "Game Dev",
        projects: ["econ-forecast", "sir-implementation"],
    },
];

renderProjectTabs();

Promise.all(projectGroups.flatMap(group => group.projects).map(fetchProject))
    .catch(err => console.error("Error initializing project page:", err));

function renderProjectTabs() {
    const tabsContainer = document.getElementById("project-tabs");
    const panelsContainer = document.getElementById("project-panels");

    if (!tabsContainer || !panelsContainer) return;

    tabsContainer.innerHTML = "";
    panelsContainer.innerHTML = "";

    projectGroups.forEach((group, index) => {
        const isActive = index === 0;

        const tabButton = document.createElement("button");
        tabButton.type = "button";
        tabButton.className = `projects-tab${isActive ? " is-active" : ""}`;
        tabButton.id = `tab-${group.id}`;
        tabButton.setAttribute("role", "tab");
        tabButton.setAttribute("aria-selected", String(isActive));
        tabButton.setAttribute("aria-controls", `panel-${group.id}`);
        tabButton.dataset.panel = group.id;
        tabButton.textContent = group.label;
        tabsContainer.appendChild(tabButton);

        const panel = document.createElement("div");
        panel.className = `projects-panel${isActive ? " is-active" : ""}`;
        panel.id = `panel-${group.id}`;
        panel.setAttribute("role", "tabpanel");
        panel.setAttribute("aria-labelledby", tabButton.id);
        panel.hidden = !isActive;

        const grid = document.createElement("div");
        grid.className = "projects-grid";
        grid.dataset.category = group.id;

        group.projects.forEach(slug => {
            const projectSlot = document.createElement("div");
            projectSlot.id = slug;
            grid.appendChild(projectSlot);
        });

        panel.appendChild(grid);
        panelsContainer.appendChild(panel);
    });

    tabsContainer.addEventListener("click", (event) => {
        const tabButton = event.target.closest(".projects-tab");
        if (!tabButton || !tabsContainer.contains(tabButton)) return;

        activateProjectPanel(tabButton.dataset.panel);
    });
}

function activateProjectPanel(panelId) {
    const tabs = document.querySelectorAll(".projects-tab");
    const panels = document.querySelectorAll(".projects-panel");

    tabs.forEach(tab => {
        const isSelected = tab.dataset.panel === panelId;
        tab.classList.toggle("is-active", isSelected);
        tab.setAttribute("aria-selected", String(isSelected));
    });

    panels.forEach(panel => {
        const isActive = panel.id === `panel-${panelId}`;
        panel.classList.toggle("is-active", isActive);
        panel.hidden = !isActive;
    });
}

// Load project cards
function fetchProject(name) {
    return fetch(`./project-cards/${name}.html`)
        .then(res => res.text())
        .then(html => {
            const target = document.getElementById(name);
            if (target) target.innerHTML = html;
        })
        .catch(err => console.error(`Error loading project ${name}:`, err));
}
