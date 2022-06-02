<?php
session_start();

$data = $_GET;

$output = array();

$zone1 = $data['circle1'] / 2;
$zone2 = $data['circle2'] / 2;
$zone3 = $data['circle3'] / 2;
$zone4 = $data['circle4'] / 2;

$distance = ((($data['objtop']) - ($data['centtop']+50))**2 + (($data['objleft']) - ($data['centleft']+50))**2)**(0.5);

if ($distance < $zone1)
    $output['zone'] = 1;
else if ($distance < $zone2)
    $output['zone'] = 2;
else if ($distance < $zone3)
    $output['zone'] = 3;
else if ($distance < $zone4)
    $output['zone'] = 4;
else 
    $output['zone'] = 5;

$zones = array($_SESSION['zone1'], $_SESSION['zone2'], $_SESSION['zone3'], $_SESSION['zone4']);

if ($data['curdrot'] == 'drot1')
    $_SESSION['drot1'] =  $output['zone'];
else if ($data['curdrot'] == 'drot2')
    $_SESSION['drot2'] =  $output['zone'];
else if ($data['curdrot'] == 'drot3')
    $_SESSION['drot3'] =  $output['zone'];
else if ($data['curdrot'] == 'drot4')
    $_SESSION['drot4'] =  $output['zone'];

$score = $zones[$_SESSION['drot1']-1] + $zones[$_SESSION['drot2']-1] + $zones[$_SESSION['drot3']-1] + $zones[$_SESSION['drot4']-1];
$output['score'] = $score;
$output['status'] = false;
        
if ($score == $_SESSION['purpose'] && $_SESSION['drot1'] != 5 && $_SESSION['drot2'] != 5 && $_SESSION['drot3'] != 5 && $_SESSION['drot4'] != 5){
    $output['status'] = true;
    $_SESSION['schet']++;
    $_SESSION['level']+=5;
    $output['schet'] = $_SESSION['schet'];
}

echo json_encode($output);