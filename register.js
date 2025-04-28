document.addEventListener("DOMContentLoaded", function () {
    const registerForm = document.getElementById("register-form");
    const errorMessage = document.getElementById("error-message");

    registerForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent form from submitting traditionally

        const fullName = document.getElementById("full_name").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirm_password").value;

        // Simple validation
        if (!fullName || !email || !password || !confirmPassword) {
            errorMessage.textContent = "All fields are required!";
            return;
        }

        if (password !== confirmPassword) {
            errorMessage.textContent = "Passwords do not match!";
            return;
        }

        // Simulating user storage (In real case, send data to backend API)
        localStorage.setItem("registeredUser", JSON.stringify({ fullName, email, password }));

        alert("Registration successful! Redirecting to login page...");
        window.location.href = "login.html"; // Simulating redirection
    });
});
