<?php
    require '../db.php';

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        // Pobranie danych z formularza
        $name = mysqli_real_escape_string($conn, $_POST['name']);
        $exp = mysqli_real_escape_string($conn, $_POST['exp']);
        $stat = mysqli_real_escape_string($conn, $_POST['stat']);
        $isActive = 1;

        // Poprawne zapytanie SQL (przykładowe kolumny, upewnij się, że odpowiadają strukturze Twojej tabeli)
        $sql = "INSERT INTO categories (name, exp, stat, isActive) VALUES ('$name', '$exp', '$stat', '$isActive')";

        // Wykonanie zapytania i obsługa błędu
        if (mysqli_query($conn, $sql)) {
            echo "Rekord został dodany poprawnie.";
            header("Location: index.html");
            exit();
        } else {
            echo "Błąd: " . mysqli_error($conn);
        }
    }

    mysqli_close($conn);
?>