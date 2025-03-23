<?php
require '../../db.php';
    session_start();
    function errorScreen($message) {
        echo '<head> <title>LAF</title>
        <link rel="stylesheet" href="../style.css">';
        echo '<body>';
        echo '<div id="page"><div class="fieldsetContainer">
                <fieldset id="loginPage">';
        echo '<h3>Błąd logowania!</h3><p>';
        echo $message;
        echo '</p><br><a href="../index.html">Powrót</a>';
        echo '</fieldset></div></div>';
        echo '</body>';
    }

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $email = trim($_POST['email']);
        $password = trim($_POST['password']);
        if (!empty($email) && !empty($password)) {
            $stmt = $conn->prepare("SELECT id_login, password FROM accounts WHERE email = ?");
            $stmt->bind_param("s", $email);
            $stmt->execute();
            $stmt->store_result();

            if ($stmt->num_rows > 0) {
                $stmt->bind_result($id, $hashed_password);
                $stmt->fetch();
                
                if (password_verify($password, $hashed_password)) {
                    $_SESSION['user_id'] = $id;
                    header("Location: ../../profilePage/index.html");
                    exit();
                } else {
                    errorScreen("Nieprawidłowe hasło.");
                }
            } else {
                errorScreen("Użytkownik nie istnieje.");
            }
            $stmt->close();
        } else {
           errorScreen("Proszę wypełnić wszystkie pola.");
        }
    }
    $conn->close();

?>