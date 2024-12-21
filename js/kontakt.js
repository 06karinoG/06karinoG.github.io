document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contactForm");

  contactForm.addEventListener("submit", (event) => {
    event.preventDefault(); // Förhindra att formuläret skickas
    const isValid = contactForm.checkValidity();

    if (isValid) {
      alert("Tack för ditt meddelande! Vi hör av oss snart.");
      contactForm.reset();
      const modal = bootstrap.Modal.getInstance(document.getElementById("contactModal"));
      modal.hide();
    } else {
      contactForm.classList.add("was-validated");
    }
  });
});
