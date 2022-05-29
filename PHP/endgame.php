<?php

$data = $_GET;
 $users = json_decode(file_get_contents('../JSON/data.json') , true);
 
 $data['coef'] =  number_format($data['score'] / $data['time'], 3, '.', ''); 
 $users[$data['user']]['games'][count($users[$data['user']]['games'])+1] = $data;
 if ($data['score'] > 0){
 file_put_contents('../JSON/data.json' , json_encode($users));
 }