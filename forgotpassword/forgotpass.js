
const forgotPasswordForm = document.getElementById("forgot-password-form");

forgotPasswordForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const user = Object.fromEntries(formData.entries())
    console.log(user)
    validateForm(user)
    // Make HTTP POST request to REST API endpoint
    axios.post('http://localhost:8080/user/login/forgotpass', user)
        .then((response) => {

            console.log(response.data);
        })
        .catch((error) => {
            console.error(error);
        });
    // const message = "Password reset link has been sent to your email!";
    // alert(message);
    // window.location.href = "../loginpage/login.html";
});

const validateForm = ({ email }) => {
    if (email.length <= 0) return { msg: 'invalid email', sts: false }
    return { sts: 'success', msg: 'all fields are valid' }
}