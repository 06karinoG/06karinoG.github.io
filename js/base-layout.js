class CVHeader extends HTMLElement {
  async connectedCallback() {
    this.innerHTML = await (await fetch("partials/header.html")).text();
    this.highlightActiveLink();
    this.setupDarkModeToggle();
    await this.populateCoursesDropdown();
  }

  // Markera den aktuella sidan i menyn
  highlightActiveLink() {
    const currentPath = window.location.pathname.split("/").pop();
    const links = this.querySelectorAll(".nav-link");

    links.forEach(link => {
      if (link.getAttribute("href") === currentPath ||
        (currentPath === "" && link.getAttribute("href") === "index.html")) {
        link.classList.add("active");
      }
    });
  }


  setupDarkModeToggle() {
    // Hämta element
    const toggleButton = this.querySelector("#dark-mode-toggle");

    // Hämta ikon
    const icon = this.querySelector("#dark-mode-icon");

    // Kolla om användaren föredrar mörkt tema
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    // Hämta tema från localStorage
    const currentTheme = localStorage.getItem("theme");

    // Sätt initialt tema
    if (currentTheme === "dark" || (!currentTheme && prefersDark)) {
      document.body.classList.add("dark-mode");
      icon.classList.replace("bi-moon", "bi-sun");
    }

    // Lyssna på knapptryck
    toggleButton.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
      const isDarkMode = document.body.classList.contains("dark-mode");

      // Växla ikon
      if (isDarkMode) {
        icon.classList.replace("bi-moon", "bi-sun");
      } else {
        icon.classList.replace("bi-sun", "bi-moon");
      }

      // Spara tema i localStorage
      localStorage.setItem("theme", isDarkMode ? "dark" : "light");
    });
  }

  async populateCoursesDropdown() {
    const dropdownMenu = this.querySelector("#coursesDropdownMenu");

    try {
      // Läs JSON-fil
      const response = await fetch("data/kurser.json");
      const courses = await response.json();

      // Generera dropdown-lista
      courses.forEach(course => {
        const courseParam = encodeURIComponent(course.name);
        const listItem = document.createElement("li");
        listItem.innerHTML = `
                <a class="dropdown-item" href="kurser.html?kurs=${courseParam}">${course.name}</a>
            `;
        dropdownMenu.appendChild(listItem);
      });
    } catch (error) {
      console.error("Kunde inte läsa kurser:", error);
    }
  }

}



// Registrera min header som ett custom element
customElements.define("cv-header", CVHeader);


class CVFooter extends HTMLElement {
  async connectedCallback() {
    this.innerHTML = await (await fetch("partials/footer.html")).text();
  }
}

// Registrera min footer som ett custom element
customElements.define("cv-footer", CVFooter);