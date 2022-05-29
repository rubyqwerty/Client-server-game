<?php

$purpose = rand(20,50);
$pur = $purpose;

$res = array();
$t = 0;

for ($i = (int)($purpose*0.2); $i < (int)($purpose*0.6); $i++)
    for ($j = (int)($purpose*0.2); $j < (int)($purpose*0.6); $j++)
        for ($k = (int)($purpose*0.2); $k < (int)($purpose*0.6); $k++)
            for ($q = (int)($purpose*0.2); $q < (int)($purpose*0.6); $q++){
                if ($i+$j+$k+$q == $purpose){
                    $res[$t] = [1 => $i, 2 => $j, 3 => $k, 4 => $q];
                    $t++;      
                }
}

$selectedpur = $res[rand(0,$t-1)];




$arr = array($selectedpur[1], $selectedpur[2], $selectedpur[3], $selectedpur[4]);

for ($i =0; $i < 4; $i++){
    for ($j =$i+1; $j < 4; $j++)
    if ($arr[$i] == $arr[$j])
        $arr[$j] = max($selectedpur) + 3;
}

$output['pole'] = '
            <div class = "circle" id = "circle4">
                <p class = "value" id = "value4" >'.$arr[3].'</p>
                <div class = "circle" id = "circle3" >
                    <p class = "value" id = "value3" >'.$arr[2].'</p>
                    <div class = "circle" id = "circle2" > 
                        <p class = "value" id = "value2" >'.$arr[1].'</p>
                        <div class = "circle" id = "circle1" >
                            <p class = "value" id = "value1" >'.$arr[0].'</p>
                        </div>
                    </div>
                </div>
            </div> 
            <img id = "drot1" src="pictures/rocket.png"  />
            <img id = "drot2"  src="pictures/rocket.png"  />
            <img id = "drot3" src="pictures/rocket.png" />
            <img id = "drot4" src="pictures/rocket.png" />
            <div class = "purpose">'.$pur.'</div>
            <div class = "score" id = "score">Очки: 0</div>
            <div class = "score" id = "schet">Счет: 0</div>
            
        ';

$output['purpose'] = $pur;

$output['zones'] = [ "zone1" => $arr[0] , 'zone2' => $arr[1] , 'zone3' => $arr[2], 'zone4' => $arr[3]];

$output['startpos'] = 5;

$output['circle4css'] = ['width' => '550px', 'height'=> '550px', 'margin-top'=> '30px'];
$output['circle3css'] = ['width' => '400px', 'height'=> '400px', 'margin-top'=> '65px', 'margin-left' => "70px"];
$output['circle2css'] = ['width' => '250px', 'height'=> '250px', 'margin-top'=> '65px', 'margin-left' => "70px"];
$output['circle1css'] = ['width' => '100px', 'height'=> '100px', 'margin-top'=> '65px', 'margin-left' => "70px"];

$output['drot1css'] = ['top' => '600', 'left' => '950'];
$output['drot2css'] = ['top' => '600', 'left' => '1010'];
$output['drot3css'] = ['top' => '600', 'left' => '1070'];
$output['drot4css'] = ['top' => '600', 'left' => '1130'];

$output['value1css'] = ['top' => '380', 'left' => '725'];
$output['value2css'] = ['top' => '380', 'left' => '637'];
$output['value3css'] = ['top' => '380', 'left' => '563'];
$output['value4css'] = ['top' => '380', 'left' => '488'];

$output['purposecss'] = ['top' => '158', 'left' => '1070'];
$output['scorecss'] = ['top' => '358', 'left' => '1070'];
$output['schetcss'] = ['top' => '48', 'left' => '470'];
$output['timecss'] = ['top' => '48'];

echo json_encode($output);