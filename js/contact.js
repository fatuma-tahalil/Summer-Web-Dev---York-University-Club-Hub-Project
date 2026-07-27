const isContactUserLoggedIn = localStorage.getItem("isLoggedIn") === "true";

function submitContactForm(event) {
  event.preventDefault();

  const contactForm = event.currentTarget;
  const errorElement = document.getElementById("contact-error");

  if (!isContactUserLoggedIn) {
    errorElement.textContent = "Please sign in before sending a message.";
    return;
  }

  errorElement.textContent = "";
  contactForm.style.display = "none";
  document.getElementById("form-success").style.display = "block";
  contactForm.reset();
}

function initializeContactPage() {
  const contactForm = document.getElementById("contact-form");
  contactForm.addEventListener("submit", submitContactForm);
}

initializeContactPage();
