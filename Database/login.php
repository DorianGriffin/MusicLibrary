<?php
// Database connection details
$servername = "your_database_server";
$username = "your_database_username";
$password = "your_database_password";
$dbname = "users_db";

// Create a connection
$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get user input from the form
$username = $_POST['username'];
$password = $_POST['password'];

// Securely hash the password (e.g., using bcrypt)
// Note: Always use a strong password hashing mechanism in a real-world application.
$hashedPassword = password_hash($password, PASSWORD_BCRYPT);

// SQL query to check user credentials
$sql = "SELECT id FROM users WHERE username = ? AND password = ?";

// Prepare and execute the query
if ($stmt = $conn->prepare($sql)) {
    $stmt->bind_param("ss", $username, $hashedPassword);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        // Login successful, redirect to a dashboard or another page
        header("Location: dashboard.html");
    } else {
        echo "Invalid username or password.";
    }

    $stmt->close();
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
