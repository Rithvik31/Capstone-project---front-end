const form = document.getElementById('user-form');
form.addEventListener('submit', createUser);

function createUser(event) {
  event.preventDefault();

  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();


  if (name === '') {
    showError(nameInput, 'Name is required');
    return;
  }

  if (email === '') {
    showError(emailInput, 'Email is required');
    return;
  } else if (!isValidEmail(email)) {
    showError(emailInput, 'Invalid email format');
    return;
  }

  if (password === '') {
    showError(passwordInput, 'Password is required');
    return;
  } else if (password.length < 8) {
    showError(passwordInput, 'Password must be at least 8 characters');
    return;
  }

  const user = { name, email, password };

  axios.post('http://localhost:8080/users/register', user)
    .then(response => {
      console.log(response.data);
      if(response.data == 'SUCCESS'){
      alert('User created successfully!');
      form.reset();
    }
    else{
      alert('USER ALREADY EXIST');
      form.reset();
    }
    })
    .catch(error => {
      console.error(error);
      alert('Error creating user.');
    });
}

const passwordInput = document.getElementById('password');
const signupBtn = document.getElementById('signup-btn');
const passwordError = document.getElementById('password-error');

passwordInput.addEventListener('input', function() {
  const passwordValue = passwordInput.value.trim();

  if (passwordValue.length >= 8) {
    signupBtn.disabled = false;
    passwordError.textContent = '';
  } else {
    signupBtn.disabled = true;
    passwordError.textContent = 'Password must be at least 8 characters';
  }
});

function showError(input, errorMessage) {
  const errorElement = input.nextElementSibling;
  errorElement.textContent = errorMessage;
}

function isValidEmail(email) {
  const regex = /\S+@\S+\.\S+/;
  return regex.test(email);
}