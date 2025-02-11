document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("registrationForm");

    form.addEventListener("submit", function (event) {
        // Prevent form submission
        event.preventDefault();

        // Clear previous error messages
        const errorElements = document.querySelectorAll(".error-message");
        errorElements.forEach((element) => element.remove());

        // Validate fields
        const fullname = document.getElementById("fullname").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirmPassword").value;

        let isValid = true;

        if (fullname === "") {
            showError("fullname", "Full Name is required");
            isValid = false;
        }

        if (email === "" || !validateEmail(email)) {
            showError("email", "A valid email is required");
            isValid = false;
        }

        if (password === "") {
            showError("password", "Password is required");
            isValid = false;
        }

        if (confirmPassword !== password) {
            showError("confirmPassword", "Passwords do not match");
            isValid = false;
        }

        // If valid, submit the form
        if (isValid) {
            alert("Form submitted successfully!");
            form.submit();
        }
    });

    // Utility function to validate email
    function validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    // Utility function to show error messages
    function showError(inputId, message) {
        const input = document.getElementById(inputId);
        const error = document.createElement("div");
        error.className = "error-message";
        error.style.color = "red";
        error.style.fontSize = "0.9rem";
        error.style.marginTop = "-10px";
        error.style.marginBottom = "10px";
        error.textContent = message;
        input.parentElement.appendChild(error);
    }
    
    const emailInput = document.getElementById("email");
    const datalist = document.getElementById("email-domains");

    const domains = [
        "gmail.com",
        "yahoo.com",
        "outlook.com",
        "hotmail.com",
        "icloud.com",
        "protonmail.com"
    ];

    emailInput.addEventListener("input", () => {
        const value = emailInput.value;

        if (value.includes("@")) {
            const [localPart] = value.split("@");

            // Clear current options (Χωρις αυτο εμφανιζει πολλαπλες φορες την list με τα domains)
            datalist.innerHTML = "";

            // Populate datalist with suggestions
            domains.forEach(domain => {
                const option = document.createElement("option");
                option.value = `${localPart}@${domain}`;
                datalist.appendChild(option);
            });

            // Enable the datalist by setting the 'list' attribute
            emailInput.setAttribute("list", "email-domains");
            
        } else {
            // Disable the datalist by removing the 'list' attribute
            emailInput.removeAttribute("list");
        }
    });
});


