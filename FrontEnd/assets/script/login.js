document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("liste_connection");
    const logoLogin = document.querySelector(".logo_login");

    const token = localStorage.getItem("token");
    if (token) {
        logoLogin.textContent = "Logout";
        logoLogin.href = "#";
        logoLogin.addEventListener("click", logout);
    }

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        
        const response = await fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (response.status === 200) {
        localStorage.setItem("token", data.token);
        logoLogin.textContent = "Logout";
        logoLogin.href = "#";
        logoLogin.addEventListener("click", logout);
        console.log("Connected:", data);
        window.location.href = "index.html";
    } 
    else if (response.status === 401) {
        console.error("Not Authorized:", data);
    } 
    else if (response.status === 404) {
        console.error("User not found:", data);
    }
});

    function logout() {
        localStorage.removeItem("token");
        logoLogin.textContent = "login";
        logoLogin.href = "login.html";
        logoLogin.removeEventListener("click", logout);
    }
});