document.addEventListener("DOMContentLoaded", async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const courseName = urlParams.get("kurs");

  try {
    // Läs JSON-fil
    const response = await fetch("data/kurser.json");
    const courses = await response.json();

    const mainBody = document.querySelector(".main-body");

    if (courseName) {
      // Hitta kurs baserat på querystring
      const course = courses.find(c => c.name === courseName);

      if (course) {
        // Uppdatera sidans innehåll
        document.getElementById("course-title").textContent = course.name;
        document.getElementById("course-description").textContent = course.description;
        document.getElementById("course-content").textContent = course.content;

        // Uppdatera bild
        const courseImage = document.getElementById("course-image");
        courseImage.innerHTML = `
          <picture>
            <source srcset="img/kurser/${course.id}.avif" type="image/avif">
        <img src="img/kurser/${course.id}.jpg" alt="Illustrativ bild på ${course.name}" class="img-fluid rounded">
          </picture>
        `;

        // Lägg till länk till Skolverket
        const externalLink = document.getElementById("course-external-link");
        externalLink.href = course.externalLink;
        externalLink.textContent = "Läs mer på Skolverket";
        externalLink.classList.remove("d-none"); // Gör länken synlig
      } else {
        // Visa felmeddelande om kursen inte hittas
        document.getElementById("course-title").textContent = "Kurs ej hittad";
        document.getElementById("course-description").textContent = "Kursen du letar efter kunde inte hittas.";
      }
    } else {
      // Inga kurser är valda: Visa kurslistan
      document.getElementById("course-title").textContent = "Alla kurser";
      document.getElementById("course-description").textContent = "Välj en kurs för att se mer information.";

      // Skapa en tabell dynamiskt
      const table = document.createElement("table");
      table.className = "table table-striped table-hover";

      // Skapa tabellhuvud
      table.innerHTML = `
        <thead class="table-dark">
          <tr>
            <th>#</th>
            <th>Kurs</th>
            <th>Beskrivning</th>
            <th>Mer information</th>
          </tr>
        </thead>
        <tbody></tbody>
      `;

      // Lägg till rader för varje kurs
      const tbody = table.querySelector("tbody");
      courses.forEach((course, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${index + 1}</td>
          <td>${course.name}</td>
          <td>${course.description}</td>
          <td>
            <a href="?kurs=${encodeURIComponent(course.name)}" class="btn btn-primary btn-sm">
              Visa
            </a>
          </td>
        `;
        tbody.appendChild(row);
      });

      // Lägg till tabellen till huvudsektionen
      mainBody.appendChild(table);
    }
  } catch (error) {
    console.error("Kunde inte läsa kurser:", error);
  }
});
