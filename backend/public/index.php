<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// OPTIONSリクエスト（プリフライト）の処理
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}
header('Content-Type: application/json');

$path = parse_url($_SERVER["REQUEST_URI"], PHP_URL_PATH);

echo json_encode([
    "requested_path" => $path,
    "server_uri" => $_SERVER["REQUEST_URI"],
    "method" => $_SERVER['REQUEST_METHOD']
]);
exit;

if ($_SERVER['REQUEST_METHOD'] === 'GET' && $path === '/todos') {
    $todos = json_decode(file_get_contents(__DIR__ . '/todos.json'), true);
    echo json_encode($todos);
}
else if ($_SERVER['REQUEST_METHOD'] === 'POST' && $path === '/todos') {
    $input = json_decode(file_get_contents('php://input'), true);
    if (!isset($input['text'])) {
        http_response_code(400);
        echo json_encode(["error" => "textがありません"]);
        exit;
    }
    $todos = json_decode(file_get_contents(__DIR__ . '/todos.json'), true);
    $newTodo = ["text" => $input['text'], "completed" => false];
    $todos[] = $newTodo;
    file_put_contents(__DIR__ . '/todos.json', json_encode($todos));
    echo json_encode($newTodo);
} else {
    http_response_code(404);
    echo json_encode(["message" => "Not Found"]);
}
