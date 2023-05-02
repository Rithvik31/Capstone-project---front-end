function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    axios.post('/api/login', {
      email: email,
      password: password
    })
    .then(function (response) {
      console.log(response.data);
      alert('Login successful');
    })
    .catch(function (error) {
      console.log(error.response.data);
      alert('Login failed');
    });
  }
  