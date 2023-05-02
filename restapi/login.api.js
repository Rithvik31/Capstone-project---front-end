function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
  
    axios.post("http://localhost:3000/login", {
      email: email,
      password: password,
    })
    .then(function (response) {
      console.log(response.data);
      // Do something with the response
    })
    .catch(function (error) {
      console.log(error);
      // Do something with the error
    });
  }
  