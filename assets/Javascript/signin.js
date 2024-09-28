const email = document.querySelector("#email");
const password = document.querySelector('#password');
const formError = document.querySelector(".form-error");
const signInBtn = document.querySelector('.signin-btn');

signInBtn.addEventListener('click', (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find((e)=>e.email === email.value);
    if(!user){
        formError.textContent = "User not found";
        formError.classList.remove("hidden");
        return;
    }

    if(user.password !== password.value){
        formError.textContent = "Password didn't match";
        formError.classList.remove("hidden");
        return;
    }

    localStorage.setItem("userLoggedIn", JSON.stringify(user));

    window.location.href = "index.html";
})