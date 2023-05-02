const form = document.getElementById('signup-form');

form.addEventListener('submit', e => {
	e.preventDefault();

	const name = document.getElementById('name').value;
	const email = document.getElementById('email').value;
	const password = document.getElementById('password').value;

	axios.post('http://example.com/signup', {
		name: name,
		email: email,
		password: password
	})
	.then(response => {
		console.log(response);
	})
	.catch(error => {
		console.log(error);
	});
});
