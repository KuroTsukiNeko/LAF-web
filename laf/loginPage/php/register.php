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

    // Wstawienie użytkownika do bazy
    $stmt = $conn->prepare("INSERT INTO accounts (nickname, password, email) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $nickname, $hashedPassword, $email);

    if ($stmt->execute()) {
        echo json_encode(["success" => "Rejestracja zakończona sukcesem!"]);
    } else {
        echo json_encode(["error" => "Błąd: " . $stmt->error]);
    }

    $stmt->close();
    $conn->close();
}
?>
