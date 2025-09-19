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

$query = "SELECT id, name, email FROM users ORDER BY id DESC";

$stmt = $conn->prepare($query);
$stmt->execute();

$num = $stmt->rowCount();

if($num>0){
    $users_arr=array();
    $users_arr["records"]=array();

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        extract($row);
        $user_item=array(
            "id" => $id,
            "name" => $name,
            "email" => $email
        );
        array_push($users_arr["records"], $user_item);
    }

    http_response_code(200);
    echo json_encode($users_arr);
} else{
    http_response_code(404);
    echo json_encode(
        array("message" => "No users found.")
    );
}
?>