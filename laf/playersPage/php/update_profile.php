<?php
    require '../../db.php';
    session_start();

    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);

    if (!isset($_SESSION["account_id"])) {
        echo json_encode(["error" => "Użytkownik nie jest zalogowany."]);
        exit();
    }

    $account_id = $_SESSION["account_id"];

    $stmt = $conn->prepare("SELECT nickname, species, class, avatar, color, advantages, disadvantages, stats, exp, completed_quest FROM players WHERE account_id = ?");
    $stmt->bind_param("i", $account_id);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $playerData = $result->fetch_assoc();
        echo json_encode($playerData);
    } else {
        echo json_encode(["error" => "Nie znaleziono danych gracza."]);
    }

    $stmt->close();
    $conn->close();
?>
