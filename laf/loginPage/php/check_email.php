<?php
require '../../db.php';

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header('Content-Type: application/json');
$response = ["exists" => false];

// Sprawdzenie, czy email został przesłany
if (isset($_GET['email'])) {
    $email = $conn->real_escape_string($_GET['email']); // Zabezpieczenie przed SQL Injection

    // Zapytanie SQL sprawdzające, czy e-mail istnieje w bazie
    $query = "SELECT email FROM accounts WHERE email = '$email'";
    $result = $conn->query($query);

    if ($result) {
        $response["exists"] = $result->num_rows > 0;
    } else {
        $response["error"] = "Błąd zapytania SQL: " . $conn->error;
    }
}

// Zamknięcie połączenia z bazą
$conn->close();

// Wysłanie poprawnego JSON-a i zatrzymanie skryptu
echo json_encode($response);
exit;
?>
