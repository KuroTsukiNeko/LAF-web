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
    } catch (mysqli_sql_excetion) {
        echo "Could not connect!";
    }
?>