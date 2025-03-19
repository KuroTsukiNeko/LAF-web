<?php
    $db_server = "localhost";
    $db_user = "root";
    $db_pass = "";
    $db_name = "laf";
    $conn = "";

    try {
        $conn = mysqli_connect(
            $db_server,
            $db_user,
            $db_pass,
            $db_name
        );

        if ($_SERVER["REQUEST_METHOD"] == "POST") {
            // Pobranie danych z formularza
            $name = mysqli_real_escape_string($conn, $_POST['name']);
            $exp = mysqli_real_escape_string($conn, $_POST['exp']);
            $stat = mysqli_real_escape_string($conn, $_POST['stat']);
            $isActive = mysqli_real_escape_string($conn, $_POST['isActive']);
    
            // Sprawdzenie, czy pole nie jest puste
            if (!empty($name)) {
                // Zapytanie SQL do dodania danych do tabeli categories
                $sql = "INSERT INTO categories (name) VALUES ('$name', '$exp', '$stat', '$isActive')";
    
                if (mysqli_query($conn, $sql)) {
                    echo "Kategoria dodana!";
                } else {
                    echo "Błąd: " . mysqli_error($conn);
                }
            } else {
                echo "Pole nie może być puste!";
            }
        }
    } catch (mysqli_sql_excetion) {
        echo "Could not connect!";
    }

    mysqli_close($conn);
?>