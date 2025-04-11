<?php
    require '../../db.php';

    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $email = trim($_POST["email"]);
    $nickname = trim($_POST["nickname"]);
    $password = $_POST["password"];

    if (empty($email) || empty($password) || empty($nickname)) {
        echo json_encode(["error" => "Wszystkie pola są wymagane."]);
    }

    // Haszowanie hasła
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
 
    // Sprawdzenie, czy e-mail już istnieje
    $stmt = $conn->prepare("SELECT id_login FROM accounts WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        echo json_encode(["error" => "E-mail jest już zajęty."]);
        $stmt->close();
        $conn->close();
        exit();
    }
    $stmt->close();

    
    // Wstawienie użytkownika do bazy
    $stmt = $conn->prepare("INSERT INTO accounts (password, email) VALUES (?, ?)");
    $stmt->bind_param("ss", $hashedPassword, $email);


    if ($stmt->execute()) {
            $id_login = $stmt->insert_id; // Pobranie ID nowo utworzonego użytkownika
            $stmt->close();

            // Wstawienie użytkownika do tabeli players
            $stmt = $conn->prepare("INSERT INTO players (account_id, nickname, species, class, avatar, color, advantages, disadvantages, stats, exp, completed_quest) VALUES (?, ?, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)");
            $stmt->bind_param("is", $id_login, $nickname);
            
            if ($stmt->execute()) {
                echo json_encode(["success" => "Rejestracja zakończona sukcesem!"]);
            } else {
                echo json_encode(["error" => "Błąd przy tworzeniu profilu gracza: " . $stmt->error]);
            }
            $stmt->close();
        } else {
            echo json_encode(["error" => "Błąd: " . $stmt->error]);
        }

        $conn->close();
    }
?>
