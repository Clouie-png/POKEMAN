<?php
$allowedOrigins = ["http://localhost:8080", "http://192.168.100.76:8080", "http://localhost"];
if (isset($_SERVER['HTTP_ORIGIN']) && in_array($_SERVER['HTTP_ORIGIN'], $allowedOrigins)) {
    header("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN']);
} else {
    header("Access-Control-Allow-Origin: http://192.168.100.76:8080"); // Fallback or default
}
header("Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Allow-Credentials: true");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

include_once './database.php';

$data = json_decode(file_get_contents("php://input"));

$name = $data->name;
$email = $data->email;
$password = $data->password;

$password_hash = password_hash($password, PASSWORD_BCRYPT);

$query = "INSERT INTO users (name, email, password) VALUES (:name, :email, :password)";

$stmt = $conn->prepare($query);

$stmt->bindParam(':name', $name);
$stmt->bindParam(':email', $email);
$stmt->bindParam(':password', $password_hash);

if($stmt->execute()){
    echo json_encode(array("message" => "User was successfully registered."));
} else{
    echo json_encode(array("message" => "Unable to register the user."));
}
?>