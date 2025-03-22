document.addEventListener("DOMContentLoaded", function() {
    const closePopupButton = document.getElementById("closePopup");
    const registerForm = document.getElementById("registerForm");
    const popup = document.getElementById("popup");
    const errorMessage = document.getElementById("textPopup");

    popup.style.display = "none";

    function validate(message){
        errorMessage.innerHTML = message;
        popup.style.display = "block";
    }

    closePopupButton.addEventListener("click", () => {
        popup.style.display = "none";
    });

    registerForm.addEventListener("submit", async function(event) {
        event.preventDefault(); // Zapobiegamy przeładowaniu strony

        let nickname = document.getElementById("nickname").value.trim();
        let password = document.getElementById("password").value;
        let confirmPassword = document.getElementById("confirmPassword").value;
        let email = document.getElementById("email").value.trim();

        errorMessage.innerHTML = ""; // Reset komunikatu błędu

        // EMAIL
        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)){
            validate("Email nieprawidłowy.");
            return;
        }

        // SPRAWDZANIE, CZY E-MAIL JEST ZAJĘTY
        let emailTaken = await checkIfEmailExists(email);
        if (emailTaken){
            validate("Ten adres e-mail jest już zajęty.");
            return;
        }

        // NICKNAME
        if (nickname === "") {
            validate("Nazwa użytkownika nie może być pusta.");
            return;
        }

        // PASSWORDS
        if (!/^(?=.*[A-Z])(?=.*\d).{6,}$/.test(password)) {
            validate("Hasło musi mieć min. 6 znaków, zawierać dużą literę i cyfrę.");
            return;
        }

        if (password !== confirmPassword) {
            validate("Hasła nie są identyczne.");
            return;
        }
        // Jeśli wszystkie warunki są spełnione, wysyłamy dane do serwera bez przeładowania strony
        let formData = new FormData(registerForm);
        try {
            let response = await fetch("php/register.php", {
                method: "POST",
                body: formData
            });

            let result = await response.json();
            if (result.success) {
                validate("Rejestracja zakończona sukcesem!");
                // Możesz tutaj przekierować użytkownika lub ukryć formularz
            } else {
                validate("Ten adres e-mail jest już zajęty.");
            }
        } catch (error) {
            console.log(error);
            validate("Błąd połączenia z serwerem.");
        }
    });

    // Funkcja sprawdzająca, czy e-mail już istnieje na serwerze
    async function checkIfEmailExists(email) {
        try {
            let response = await fetch("php/check_email.php?email=" + encodeURIComponent(email));
            let data = await response.json();
            return data.exists; // Oczekujemy odpowiedzi { "exists": true } lub { "exists": false }
        } catch (error) {
            return false; // W razie błędu traktujemy, jakby e-mail był wolny (ale można to inaczej obsłużyć)
        }
    }
});
