
        const authUrl = 'https://apibackend-production-1cd4.up.railway.app/productos/token/';
        const dataUrl = 'https://apibackend-production-1cd4.up.railway.app/productos/productos/';

        async function login() {
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            try {
                const response = await axios.post(authUrl, { username, password });
                const token = response.data.access;
                localStorage.setItem('token', token);
                document.getElementById('login-container').classList.add('hidden');
                fetchData(token);
            } catch (err) {
                console.error('Login error:', err.response ? err.response.data : err.message);
                document.getElementById('data-container').innerHTML = 'Error de autenticación.';
            }
        }

        async function fetchData(token) {
            try {
                const response = await axios.get(dataUrl, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                displayData(response.data);
            } catch (err) {
                console.error('Error fetching data:', err.response ? err.response.data : err.message);
                document.getElementById('data-container').innerHTML = 'Error al cargar los datos.';
            }
        }

        function displayData(data) {
            const container = document.getElementById('data-container');
            container.innerHTML = '';
            container.classList.remove('hidden');

            data.forEach(item => {
                const div = document.createElement('div');
                div.className = 'item';
                div.innerHTML = `
                    <h2>${item.title}</h2>
                    <img src="${item.imagen}" alt="${item.title}">
                `;
                container.appendChild(div);
            });
        }