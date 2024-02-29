<?php

require_once("./utils.php");

if (!session_id()) {
    session_start();
}

if (!isset($_SESSION["auth_tokens"])) {
    $tokens = [];
} else {
    $tokens = decode($_SESSION["auth_tokens"] ?? "[]");
}

$headers = getallheaders();
$authHeader = $headers["Authorization"];

$parts = explode(" ", $authHeader);
$token = $parts[1];

$user = findUserByToken($tokens, $token);
if (!$user) {
    header("HTTP/1.1 400 No Content", true, 400);
    return;
}

$route = $_GET["route"];

$news = [
    [
        "id" => "52880006-dd77-432c-a976-0a79aa4e3358",
        "title" => "Quam iure sunt repellat odit",
        "image" => 'https://placeimg.com/640/480/nature',
        "content" => "Quam iure sunt repellat odit, mollitia exercitationem nam, ad dolor voluptate blanditiis eum",
    ],
    [
        "id" => "1410263d-5a0f-4020-b901-a64e8ab49ed8",
        "title" => "Lorem ipsum dolor sit amet",
        "image" => 'https://placeimg.com/640/480/arch',
        "content" => " Quam iure sunt repellat odit, mollitia exercitationem nam, ad dolor voluptate blanditiis eum, accusantium veniam neque quidem fugit ullam quaerat tenetur aliquam!",
    ],
    [
        "id" => "aa1d693a-62ac-4f75-af0a-08b391edd2e1",
        "title" => "Quam iure sunt repellat odit",
        "image" => 'https://placeimg.com/640/480/tech',
        "content" => "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam iure sunt repellat odit",
    ],
    [
        "id" => "5fb54f03-87d7-4737-b497-ffe84782d5fc",
        "title" => "Quam iure sunt",
        "image" => 'https://placeimg.com/640/480/sepia',
        "content" => "Mollitia exercitationem nam, ad dolor voluptate blanditiis eum, accusantium veniam neque quidem fugit ullam quaerat tenetur aliquam!",
    ],
];


if ($route === "me") {
    echo (encode($user));
} elseif ($route === "news") {
    echo (encode($news));
} elseif (str_starts_with($route, "news")) {
    $routeParts = explode("/", $route);
    $itemId = $routeParts[1] ?? null;
    $item = findItemById($news, $itemId);
    echo (encode($item));
}
