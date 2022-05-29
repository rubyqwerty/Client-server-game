<?php

$data = $_GET;

$output = array();

$zone1 = $data['circle1'] / 2;
$zone2 = $data['circle2'] / 2;
$zone3 = $data['circle3'] / 2;
$zone4 = $data['circle4'] / 2;

$distance = ((($data['objtop']+45) - ($data['centtop']+50))**2 + (($data['objleft']+27) - ($data['centleft']+50))**2)**(0.5);

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

$zones = array($data['zone1'], $data['zone2'], $data['zone3'], $data['zone4']);

if ($data['curdrot'] == 'drot1')
    $data['drot1'] =  $output['zone'];
else if ($data['curdrot'] == 'drot2')
    $data['drot2'] =  $output['zone'];
else if ($data['curdrot'] == 'drot3')
    $data['drot3'] =  $output['zone'];
else if ($data['curdrot'] == 'drot4')
    $data['drot4'] =  $output['zone'];

$score = $zones[$data['drot1']-1] + $zones[$data['drot2']-1] + $zones[$data['drot3']-1] + $zones[$data['drot4']-1];
$output['score'] = $score;
$output['status'] = false;
        
if ($score == $data['purpose'] && $data['drot1'] != 5 && $data['drot2'] != 5 && $data['drot3'] != 5 && $data['drot4'] != 5){
    $output['status'] = true;
    $output['schet'] = $data['schet'] + 1;
    
}

echo json_encode($output);