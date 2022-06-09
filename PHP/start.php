<?php

session_start();
if (array_key_exists('lives', $_SESSION) == false) {
    $_SESSION['lives'] = 5;
}
if (array_key_exists('schet', $_SESSION) == false) {
    $_SESSION['schet'] = 0;
}
if (array_key_exists('level', $_SESSION) == false) {
    $_SESSION['level'] = 0;
}


$_SESSION['time'] = 16;
$purpose = rand(20, 25) + $_SESSION['level'];
$pur = $purpose;

$res = array();
$t = 0;

for ($i = (int) ($purpose * 0.2); $i < (int) ($purpose * 0.6); $i++)
    for ($j = (int) ($purpose * 0.2); $j < (int) ($purpose * 0.6); $j++)
        for ($k = (int) ($purpose * 0.2); $k < (int) ($purpose * 0.6); $k++)
            for ($q = (int) ($purpose * 0.2); $q < (int) ($purpose * 0.6); $q++) {
                if ($i + $j + $k + $q == $purpose) {
                    $res[$t] = [1 => $i, 2 => $j, 3 => $k, 4 => $q];
                    $t++;
                }
            }

$selectedpur = $res[rand(0, $t - 1)];




$arr = array($selectedpur[1], $selectedpur[2], $selectedpur[3], $selectedpur[4]);

for ($i = 0; $i < 4; $i++) {
    for ($j = $i + 1; $j < 4; $j++)
        if ($arr[$i] == $arr[$j])
            $arr[$j] = max($selectedpur) + 3;
}

$output['pole'] = '
    
            <div class = "circle" id = "circle4">
                <p class = "value" id = "value4" >' . $arr[3] . '</p>
                <p class = "value" id = "value4-1" >' . $arr[3] . '</p>
                <div class = "circle" id = "circle3" >
                    <p class = "value" id = "value3" >' . $arr[2] . '</p>
                     <p class = "value" id = "value3-1" >' . $arr[2] . '</p>
                    <div class = "circle" id = "circle2" > 
                        <p class = "value" id = "value2" >' . $arr[1] . '</p>
                        <p class = "value" id = "value2-1" >' . $arr[1] . '</p>
                        <div class = "circle" id = "circle1" >
                            <p class = "value" id = "value1" >' . $arr[0] . '</p>
                        </div>
                    </div>
                </div>
            </div> 
            <img id = "drot1" src="pictures/drotic.png" class = "drot" />
            <img id = "drot2"  src="pictures/drotic.png"  class = "drot"/>
            <img id = "drot3" src="pictures/drotic.png" class = "drot" />
            <img id = "drot4" src="pictures/drotic.png" class = "drot"/>
            <div class = "purpose">' . $pur . '</div>
            <div class = "score" id = "score">Очки: 0</div>
            <div class = "score" id = "schet">Уровень: 0</div>
            
        ';

$_SESSION['zone1'] = $arr[0];
$_SESSION['zone2'] = $arr[1];
$_SESSION['zone3'] = $arr[2];
$_SESSION['zone4'] = $arr[3];

$_SESSION['drot1'] = 5;
$_SESSION['drot2'] = 5;
$_SESSION['drot3'] = 5;
$_SESSION['drot4'] = 5;

$_SESSION['purpose'] = $pur;


$output['purpose'] = $pur;

$output['zones'] = ["zone1" => $arr[0], 'zone2' => $arr[1], 'zone3' => $arr[2], 'zone4' => $arr[3]];

$output['startpos'] = 5;

$output['circle4css'] = ['width' => '550px', 'height' => '550px', 'margin-top' => '30px', 'border-color' => "#814129", 'background-image' => 'url(pictures/pesok.jpg)'];
$output['circle3css'] = ['width' => '400px', 'height' => '400px', 'margin-top' => '70px', 'margin-left' => "70px", 'background-color' => '#FEF1EC', 'border-color' => "#814129", 'background-image' => 'url(pictures/pesok2.jpg)'];
$output['circle2css'] = ['width' => '250px', 'height' => '250px', 'margin-top' => '70px', 'margin-left' => "70px", 'border-color' => "#814129", 'background-image' => 'url(pictures/pesok.jpg)'];
$output['circle1css'] = ['width' => '100px', 'height' => '100px', 'margin-top' => '70px', 'margin-left' => "70px", 'border-color' => "#814129", 'background-image' => 'url(pictures/pesok2.jpg)'];

$output['drot1css'] = ['top' => '560', 'left' => '900'];
$output['drot2css'] = ['top' => '560', 'left' => '960'];
$output['drot3css'] = ['top' => '560', 'left' => '1020'];
$output['drot4css'] = ['top' => '560', 'left' => '1080'];

$output['value1css'] = ['top' => '390', 'left' => '615'];
$output['value2css'] = ['top' => '390', 'left' => '520'];
$output['value3css'] = ['top' => '390', 'left' => '450'];
$output['value4css'] = ['top' => '390', 'left' => '370'];

$output['value2-1css'] = ['top' => '390', 'left' => '695'];
$output['value3-1css'] = ['top' => '390', 'left' => '770'];
$output['value4-1css'] = ['top' => '390', 'left' => '845'];

$output['purposecss'] = ['top' => '130', 'left' => '950'];
$output['scorecss'] = ['top' => '290', 'left' => '950'];
$output['schetcss'] = ['top' => '165', 'left' => '10'];
$output['timecss'] = ['top' => '78', 'left' => '10'];
$output['lives'] = $_SESSION['lives'];

echo json_encode($output);
