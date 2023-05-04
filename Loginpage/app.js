const form = document.querySelector('form');
const loginStatus = document.querySelector('#login-status');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;

  try {
    const response = await axios.post('http://localhost:8080/users/login', {
      email,
      password
    });
    
    if (response.status === 200) {
      loginStatus.innerHTML = 'Login successful';
      window.location.href = '/dashboard.html';
    }
  } catch (error) {
    loginStatus.innerHTML = 'Login failed';
  }
});