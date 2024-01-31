<?php
// Receive the JSON data sent via POST request from JavaScript
$data = file_get_contents('php://input');

// Decode the JSON data to a PHP array
$array = json_decode($data, true);

// Establish a connection to your database (example assuming MySQL)
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "Bankmangement";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Loop through the array and insert each record into the database
foreach ($array as $record) {
    $ID = $record['ID'];
    $Name = $record['Name'];
    $Manager = $record['Manager'];

    // Your SQL query to insert data into the table (adjust table/column names accordingly)
    $sql = "INSERT INTO branches (ID, Name, Manager) VALUES ('$ID', '$Name', '$Manager')";
    if ($conn->query($sql) !== TRUE) {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}

$conn->close();
?>
