document.getElementById('registerForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const firstname = document.getElementById('first-name').value;
    const lastname = document.getElementById('last-name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const phoneNumber = document.getElementById('phone-number').value;

    const response = await fetch('http://localhost:3000/user/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ firstname,lastname, password,email ,phoneNumber})
    });

    if (response.ok) {
        alert('User registered successfully');

        window.location.href = "/login";
    } else {
        alert('Error registering user');
    }
});
