<?php
session_start();
$_SESSION['time']--;
$output['time'] = $_SESSION['time'];
$output['status'] = true;
if ($_SESSION['time'] == 0){
    $_SESSION['lives']--;
    $_SESSION['time'] = 16;
}
$output['lives'] = $_SESSION['lives'];
if ($_SESSION['lives'] == 0)
    $output['status'] = false;
echo json_encode($output);
