document.getElementById('registro').addEventListener('submit', async function (e) {
    e.preventDefault();
    const formData = {
        'registro-usuario': e.target['registro-usuario'].value,
        'registro-email': e.target['registro-email'].value,
        'registro-password': e.target['registro-password'].value
    };
    try {
        const response = await fetch('/registro', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
        const data = await response.json();
        if (data.success) {
            alert('Usuario creado exitosamente!');
        } else {
            alert('El usuario ya existe.');
        }
    } catch (error) {
        alert('Hubo un error al registrar al usuario.');
    }
});
