function handleLogin() {
    const usernameInput = document.getElementById('username').value.trim();
    const passwordInput = document.getElementById('password').value;
    const errorElement = document.getElementById('login-error');

    errorElement.textContent = '';

    if (!usernameInput || !passwordInput) {
        errorElement.textContent = 'Please enter both your username and password.';
        return;
    }

    // Set your admin password here
    const ADMIN_PASSWORD = "YorkAdmin2026!";

    if (passwordInput === ADMIN_PASSWORD) {
        // Grant admin access
        localStorage.setItem('isAdmin', 'true');

        // Redirect to the Explore Clubs page or Home
        window.location.href = 'clubs.html';
    } else {
        errorElement.textContent = 'Invalid credentials. Please try again.';
    }
}