<?php
$servername = "127.0.0.1"; // Replace with your MySQL server's hostname
$username = "root"; // Replace with your MySQL username
$password = ""; // Replace with your MySQL password
$dbname = "bankmangement"; // Replace with your MySQL database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get POST data from AJAX request
$data = json_decode(file_get_contents("php://input"));

// Prepare and bind SQL statement
$stmt = $conn->prepare("INSERT INTO branches (Name, Manager) VALUES (?, ?)");
$stmt->bind_param("ss", $data->Name, $data->Manager);

// Set parameters and execute statement
$stmt->execute();

// Close statement and connection
$stmt->close();
$conn->close();

// Return success message or appropriate response
echo json_encode(array("message" => "Branch added successfully"));
?>
