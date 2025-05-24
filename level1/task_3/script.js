document.addEventListener('DOMContentLoaded', () => {
    // Load existing users
    fetch('http://localhost:3000/api/users')
        .then(res => res.json())
        .then(data => {
            const list = document.getElementById('usersList');
            data.forEach(user => {
                const li = document.createElement('li');
                li.textContent = `${user.name} (${user.email})`;
                list.appendChild(li);
            });
        })
        .catch(err => console.error('Error fetching users:', err));

    // Handle form submission
    const form = document.getElementById('user-entry');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;

        try {
            const res = await fetch('http://localhost:3000/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email }),
            });

            const newUser = await res.json();

            // Update UI with new user
            const li = document.createElement('li');
            li.textContent = `${newUser.name} (${newUser.email})`;
            document.getElementById('usersList').appendChild(li);

            form.reset();
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    });
});
