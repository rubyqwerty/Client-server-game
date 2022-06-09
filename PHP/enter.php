<?php

session_start();

 
$data = $_GET;

$errors['enter'] = '';
$errors['status'] = false;

if ($data['login'] == '' || $data['password'] == '')
    $errors['enter'] = 'Введите логин/пароль';
else{

    $users = json_decode(file_get_contents('../JSON/data.json') , true);

    $flag = false;

    foreach($users as $key => $user){
            if ($data['login'] == $user['login'] && $data['password'] == $user['password']){
                $flag = true;
                break;
            }
    }
    
    if ($flag == false)
        $errors['enter'] = 'Неправильный логин или пароль';
    else{
        $errors['status'] = true;
        $errors['user'] = $users[$data['login']]['email'];
        $errors['loginuser'] = $data['login'];
        
        $_SESSION['username'] = $users[$data['login']]['email'];
        $_SESSION['userlogin'] = $data['login'];
        
        
        }
}

echo json_encode($errors);