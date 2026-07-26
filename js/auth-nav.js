const loginLink = document.getElementById("nav-signin");
const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

loginLink.addEventListener("click", handleLoginLinkClick);

function updateLoginLink() {
  if (isLoggedIn) {
    loginLink.textContent = "Sign Out";
    loginLink.href = "#";
  } else {
    loginLink.textContent = "Sign In";
    loginLink.href = "login.html";
  }
}

function handleLoginLinkClick(event) {
  if (!isLoggedIn) {
    return;
  }

  event.preventDefault();

  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("isAdmin");
  localStorage.removeItem("loggedInEmail");

  window.location.href = "login.html";
}

updateLoginLink();
