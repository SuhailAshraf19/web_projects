<?php
session_start();

// Replace with actual authentication logic
function authenticateUser($username, $password) {
    // Check username and password against database (not shown in this snippet)
    // Return true if authenticated, false otherwise
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = $_POST['username'];
    $password = $_POST['password'];

    if (authenticateUser($username, $password)) {
        $_SESSION['username'] = $username;
        header('Location: flight_prices.php');
        exit();
    } else {
        $errorMessage = 'Invalid credentials';
    }
}
?>
