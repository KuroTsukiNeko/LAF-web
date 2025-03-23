<?php
require '../../db.php';

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
                    echo "Nieprawidłowe hasło.";
                }
            } else {
                echo "Nie znaleziono użytkownika.";
            }
            $stmt->close();
        } else {
            echo "Proszę wypełnić wszystkie pola.";
        }
    }
    $conn->close();

?>