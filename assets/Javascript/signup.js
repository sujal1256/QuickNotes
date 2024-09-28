const fullName = document.querySelector("#full-name");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const signupButton = document.querySelector(".signup-btn");
const formError = document.querySelector(".form-error");

function handleFocus(e) {
  formError.classList.add("hidden");
}

fullName.addEventListener("focus", handleFocus);
email.addEventListener("focus", handleFocus);
password.addEventListener("focus", handleFocus);

signupButton.addEventListener("click", (e) => {
  e.preventDefault();

  const users = JSON.parse(localStorage.getItem("users")) || [];

  const emailValid = true;
  users.forEach((user) => {
    if (user.email === email?.value) {
      formError.textContent = "Email already registered";
      formError.classList.remove("hidden");
      emailValid = false;
      return;
    }
  });

  if (!emailValid) return;

  if (
    !email.value.includes("@") ||
    fullName.value.trim() === "" ||
    password.value.trim() === "" ||
    password.value.length < 8
  ) {
    formError.textContent = "Enter valid Inputs";
    formError.classList.remove("hidden");
    return;
  }

  const newUser = {
    id: new Date().getTime(),
    name: fullName.value,
    email: email.value,
    password: password.value,
  };
  users.push(newUser);

  localStorage.setItem("users", JSON.stringify(users));

  signupButton.style.backgroundColor = "lightgrey";
  setTimeout(() => {
    window.location.href = "signin.html";
  }, 1000);
});
