const form = document.querySelector("#form-contact");

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = {
        name: document.getElementById("inputName").value,
        empresa: document.getElementById("inputEmpresa").value,
        email: document.getElementById("inputEmail").value,
        telefono: document.getElementById("inputTelf").value,
        asunto: document.querySelector("select[name=asunto]").value,
        mensaje: document.querySelector("textarea").value
    };

    try {
        const response = await fetch("/guardar-formulario", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        });

        const data = await response.json();

        if (data.message) {
            alert("Su mensaje ha sido enviado");
            form.reset();
        }
    } catch (error) {
        alert("Hubo un error al enviar el formulario.");
        console.error(error);
    }
});

