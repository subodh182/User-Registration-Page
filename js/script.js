document.getElementById("registrationForm").addEventListener("submit", async function(e) {
    e.preventDefault();

    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const message = document.getElementById("message");

    if (password.length < 6) {
        message.style.color = "red";
        message.textContent = "Password must be at least 6 characters.";
        return;
    }

    if (password !== confirmPassword) {
        message.style.color = "red";
        message.textContent = "Passwords do not match.";
        return;
    }

    try {
        const response = await fetch("http://localhost:5000/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ firstName, lastName, email, password })
        });

        const data = await response.json();
        message.style.color = "green";
        message.textContent = data.message;

    } catch (error) {
        message.style.color = "red";
        message.textContent = "Server error!";
    }
});
