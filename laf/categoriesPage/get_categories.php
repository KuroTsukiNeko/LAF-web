<?php
    require '../db.php';
error_reporting(E_ALL);
ini_set('display_errors', 1);

header('Content-Type: application/json');

$sql = "SELECT id_category, name, exp, stat, isActive FROM categories";
$result = mysqli_query($conn, $sql);

$players = [];

while ($row = mysqli_fetch_assoc($result)) {
    $players[] = [
        'id' => $row['id_category'],
        'name' => $row['name'],
        'stat' => $row['stat'],
        'exp' => $row['exp'],
        'active' => $row['isActive'] ? 'TAK' : 'NIE'
    ];
}

echo json_encode($players);
?>
