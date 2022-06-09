<?php

session_start();
$users = json_decode(file_get_contents('../JSON/data.json'), true);
$_SESSION['lives'] = 5;
$data['score'] = $_SESSION['schet'];
$data['time'] = date('jS \of F Y h:i:s');
$_SESSION['level'] = 0;
$users[$_SESSION['userlogin']]['games'][count($users[$_SESSION['userlogin']]['games']) + 1] = $data;
if ($_SESSION['schet'] > 0) {
    file_put_contents('../JSON/data.json', json_encode($users));
}
$_SESSION['schet'] = 0;
echo json_encode($data);
