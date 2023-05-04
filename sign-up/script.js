const form = document.querySelector('form');
form.addEventListener('submit', createUser);

function createUser(event) {
  event.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const user = { name, email, password };
  axios.post('http://localhost:8080/users/register', user)
    .then(response => {
      console.log(response.data);
      alert('User created successfully!');
      form.reset();
    })
    .catch(error => {
      console.error(error);
      alert('Error creating User.');
    });
}

const passwordInput = document.getElementById('password');
const signupBtn = document.getElementById('signup-btn');

passwordInput.addEventListener('input', function() {
    if (passwordInput.value.length >= 8) {
        signupBtn.disabled = false;
    } else {
        signupBtn.disabled = true;
    }
});