<?php
// webhook.php

// Lee el cuerpo de la petición (ej. JSON enviado por el proveedor)
$input = file_get_contents("php://input");

// Lo convierte a arreglo PHP
$data = json_decode($input, true);

// Escribe el contenido recibido en un archivo de logs (solo ejemplo)
file_put_contents("webhook.log", print_r($data, true), FILE_APPEND);

// Responde al proveedor con éxito
http_response_code(200);
echo json_encode(["status" => "ok"]);
?>
