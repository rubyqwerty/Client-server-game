<?php
session_start();
$data['base'] = json_decode(file_get_contents('../JSON/data.json'),true);
$data['userlogin'] = $_SESSION['userlogin'];
echo json_encode($data);
