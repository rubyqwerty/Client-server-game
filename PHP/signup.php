<?php

$data = $_GET;

$errors["email"] = '';
$errors['login'] = '';
$errors['password'] = '';
$errors['status'] = false;

if ($data['email'] == ''){
    $errors["email"] = 'Введите имя';
} else if (preg_match('/[^a-za-яё]/iu' , $data['email'])){
    $errors['email'] = 'Введите нормальное имя';
}

$users = json_decode(file_get_contents('../JSON/data.json') , true);

if ($data['login'] == ''){
    $errors['login'] = 'Придумайте логин';
} else {
    foreach($users as $key => $value){
        if ($data['login'] == $key)
            $errors['login'] = 'Такой логин занят, придумайте другой';
    }
}

if ($data['password'] == ''){
    $errors['password'] = 'Придумайте пароль';
}



if ($errors["email"] == '' && $errors['login'] == '' && $errors['password'] == ''){

    $users[$data['login']] = $data;

    file_put_contents('../JSON/data.json' , json_encode($users));
    
    $errors['status'] = true;

}

echo json_encode($errors);