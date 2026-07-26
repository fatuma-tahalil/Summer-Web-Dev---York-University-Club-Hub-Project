const loginForm = document.getElementById("login-form");
const usernameElement = document.getElementById("username");
const passwordElement = document.getElementById("password");
const capsLockState = document.getElementById("capslock-state");
const errorElement = document.getElementById("login-error");

loginForm.addEventListener("submit", handleLogin);
passwordElement.addEventListener("keydown", updateCapsLockWarning);
passwordElement.addEventListener("keyup", updateCapsLockWarning);
passwordElement.addEventListener("blur", function () {
  capsLockState.hidden = true;
});

function handleLogin(event) {
  event.preventDefault();

  const usernameValue = usernameElement.value.trim();
  const passwordValue = passwordElement.value;
  errorElement.textContent = "";

  // If no username or password is inputted
  if (!usernameValue || !passwordValue) {
    errorElement.textContent = "Please enter both your username and password.";
    return;
  }

  localStorage.setItem("isLoggedIn", "true");

  const ADMIN_PASSWORD = "YorkAdmin2026!";

  if (passwordValue === ADMIN_PASSWORD) {
    localStorage.setItem("isAdmin", "true");
  } else {
    localStorage.removeItem("isAdmin");
  }

  localStorage.setItem("loggedInEmail", usernameValue);
  window.location.href = "clubs.html";
}

function updateCapsLockWarning(event) {
  const capsLockIsOn = event.getModifierState("CapsLock");
  capsLockState.hidden = !capsLockIsOn;
}
