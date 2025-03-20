<?php
    require '../db.php';

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $id = $_POST['id']; // ID kategorii
        $name = $_POST['name'];
        $stat = $_POST['stat'];
        $exp = $_POST['exp'];

        // Przygotowanie zapytania SQL (unikamy wstrzykiwania SQL)
        $sql = "UPDATE categories SET name = ?, stat = ?, exp = ? WHERE id_category = ?";
        
        // Przygotowanie zapytania
        $stmt = mysqli_prepare($conn, $sql);
        mysqli_stmt_bind_param($stmt, "ssii", $name, $stat, $exp, $id);

        if (mysqli_stmt_execute($stmt)) {
            echo json_encode(["status" => "success", "message" => "Kategoria została zaktualizowana"]);
            header("Location: index.html");
            exit();
        } else {
            echo json_encode(["status" => "error", "message" => "Błąd podczas aktualizacji"]);
        }

        mysqli_stmt_close($stmt);
        mysqli_close($conn);
    } else {
        echo json_encode(["status" => "error", "message" => "Nieprawidłowe żądanie"]);
    }
?>