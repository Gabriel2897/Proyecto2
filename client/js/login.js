const loginForm = document.getElementById("login-form");
const offcanvasLogin = new bootstrap.Offcanvas(document.getElementById('cuenta'));
const submitButton = loginForm.querySelector('input[type="submit"]');

loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const usernameInput = document.getElementById("usuario");
    const passwordInput = document.getElementById("password");
    const username = usernameInput.value;
    const password = passwordInput.value;

    submitButton.disabled = true;

    fetch("/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username,
            password,
        }),
    })
    .then((response) => response.json())
    .then((data) => {
        if (data.success) {
            usernameInput.value = '';
            passwordInput.value = '';
            offcanvasLogin.hide();
            window.location.href = "/";
        } else {
            alert("Usuario o contraseña incorrecto");
        }
    })
    .catch((error) => {
        console.error("Hubo un error durante la solicitud:", error);
        alert("Ocurrió un error al intentar iniciar sesión. Por favor, inténtalo de nuevo.");
    })
    .finally(() => {
        submitButton.disabled = false;
    });
});
