// register.js

const registerForm = document.getElementById("registerForm");
const registerName = document.getElementById("registerName");
const registerEmail = document.getElementById("registerEmail");
const registerPassword = document.getElementById("registerPassword");
const confirmPassword = document.getElementById("confirmPassword");
const termsCheckbox = document.getElementById("termsCheckbox");
const registerBtn = document.getElementById("registerBtn");
const authMessage = document.getElementById("authMessage");


// --------------------------------------------------
// MESSAGE HELPER
// --------------------------------------------------

function showMessage(message, type = "error") {
    authMessage.textContent = message;
    authMessage.className = `auth-message ${type}`;
}


// --------------------------------------------------
// EMAIL VALIDATION
// --------------------------------------------------

function isValidEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}


// --------------------------------------------------
// GET USERS
// --------------------------------------------------

function getUsers() {
    try {
        const users = localStorage.getItem("cwsUsers");

        if (!users) {
            return [];
        }

        return JSON.parse(users);
    } catch (error) {
        console.error("Unable to read users:", error);
        return [];
    }
}


// --------------------------------------------------
// SAVE USERS
// --------------------------------------------------

function saveUsers(users) {
    localStorage.setItem("cwsUsers", JSON.stringify(users));
}


// --------------------------------------------------
// FORM SUBMISSION
// --------------------------------------------------

registerForm.addEventListener("submit", function (event) {
    event.preventDefault();

    // Clear previous message
    authMessage.textContent = "";
    authMessage.className = "auth-message";


    // Get values
    const name = registerName.value.trim();
    const email = registerEmail.value.trim().toLowerCase();
    const password = registerPassword.value;
    const confirmPasswordValue = confirmPassword.value;


    // --------------------------------------------------
    // VALIDATION
    // --------------------------------------------------

    if (!name) {
        showMessage("Please enter your full name.");
        registerName.focus();
        return;
    }


    if (!email) {
        showMessage("Please enter your email address.");
        registerEmail.focus();
        return;
    }


    if (!isValidEmail(email)) {
        showMessage("Please enter a valid email address.");
        registerEmail.focus();
        return;
    }


    if (password.length < 8) {
        showMessage("Password must contain at least 8 characters.");
        registerPassword.focus();
        return;
    }


    if (password !== confirmPasswordValue) {
        showMessage("Passwords do not match.");
        confirmPassword.focus();
        return;
    }


    if (!termsCheckbox.checked) {
        showMessage("You must agree to the Terms of Use and Privacy Policy.");
        termsCheckbox.focus();
        return;
    }


    // --------------------------------------------------
    // CHECK EXISTING USER
    // --------------------------------------------------

    const users = getUsers();

    const existingUser = users.find(
        user => user.email === email
    );

    if (existingUser) {
        showMessage(
            "An account with this email already exists. Please sign in."
        );

        registerEmail.focus();
        return;
    }


    // --------------------------------------------------
    // DISABLE BUTTON
    // --------------------------------------------------

    registerBtn.disabled = true;
    registerBtn.textContent = "Creating Account...";


    // --------------------------------------------------
    // CREATE USER
    // --------------------------------------------------

    const newUser = {
        id: crypto.randomUUID
            ? crypto.randomUUID()
            : Date.now().toString(),

        name: name,
        email: email,
        password: password,

        createdAt: new Date().toISOString()
    };


    users.push(newUser);


    // --------------------------------------------------
    // SAVE USER
    // --------------------------------------------------

    try {
        saveUsers(users);

        showMessage(
            "Account created successfully! Redirecting to sign in...",
            "success"
        );


        // Clear password fields
        registerPassword.value = "";
        confirmPassword.value = "";


        // Redirect to login page
        setTimeout(() => {
            window.location.href = "login.html";
        }, 1500);

    } catch (error) {
        console.error("Registration error:", error);

        showMessage(
            "Something went wrong while creating your account. Please try again."
        );

        registerBtn.disabled = false;
        registerBtn.textContent = "Create Account";
    }
});