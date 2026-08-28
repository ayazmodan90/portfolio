<?php

require_once __DIR__ . "/../includes/db.php";

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    header("Location: ../index.php");
    exit;
}


/* =========================
   GET FORM DATA
   ========================= */

$name = trim($_POST["name"] ?? "");
$email = trim($_POST["email"] ?? "");
$service = trim($_POST["service"] ?? "");
$message = trim($_POST["message"] ?? "");


/* =========================
   VALIDATION
   ========================= */

if (
    empty($name) ||
    empty($email) ||
    empty($service) ||
    empty($message)
) {
    header("Location: ../index.php?status=error#contact");
    exit;
}


if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    header("Location: ../index.php?status=invalid-email#contact");
    exit;
}


/* =========================
   INSERT MESSAGE
   ========================= */

$sql = "INSERT INTO messages
        (name, email, service, message)
        VALUES (?, ?, ?, ?)";

$stmt = $conn->prepare($sql);

if (!$stmt) {
    header("Location: ../index.php?status=error#contact");
    exit;
}

$stmt->bind_param(
    "ssss",
    $name,
    $email,
    $service,
    $message
);


if ($stmt->execute()) {

    $stmt->close();
    $conn->close();

    header("Location: ../index.php?status=success#contact");
    exit;

}


/* =========================
   ERROR
   ========================= */

$stmt->close();
$conn->close();

header("Location: ../index.php?status=error#contact");
exit;

?>