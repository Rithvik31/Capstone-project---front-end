const signupForm = document.getElementById("signup-form");

signupForm.addEventListener("submit", (e) => {
	e.preventDefault();

	const name = document.getElementById("name").value;
	const email = document.getElementById("email").value;
	const password = document.getElementById("password").value;

	axios.post("http://your-backend-url.com/signup", {
		name: name,
		email: email,
		password: password
	})
	.then(response => {
		// Handle successful response here
		console.log(response.data);
	})
	.catch(error => {
		// Handle error response here
		console.log(error);
	});
});
