<?php
error_log("login.php: Script started.");
header("Access-Control-Allow-Origin: http://192.168.100.76:8080");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Allow-Credentials: true");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

error_log("login.php: Before include_once database.php");
include_once './database.php';
error_log("login.php: After include_once database.php");

$data = json_decode(file_get_contents("php://input"));

if ($data === null) {
    error_log("login.php: JSON decode failed or empty input.");
    http_response_code(400);
    echo json_encode(array("message" => "Invalid JSON input."));
    exit;
}

error_log("login.php: JSON data received.");

$email = $data->email;
$password = $data->password;

error_log("login.php: Email: " . $email);

$query = "SELECT id, name, email, password FROM users WHERE email = :email LIMIT 0,1";

$stmt = $conn->prepare($query);
$stmt->bindParam(':email', $email);
$stmt->execute();

$num = $stmt->rowCount();

if($num > 0){
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    $id = $row['id'];
    $name = $row['name'];
    $email = $row['email'];
    $password2 = $row['password'];

    if(password_verify($password, $password2)){
        http_response_code(200);
        echo json_encode(array(
            "message" => "Successful login.",
            "data" => array(
                "id" => $id,
                "name" => $name,
                "email" => $email
            )
        ));
    } else{
        http_response_code(401);
        echo json_encode(array("message" => "Login failed."));
    }
} else{
    http_response_code(401);
    echo json_encode(array("message" => "Login failed."));
}
error_log("login.php: Script finished.");
?>