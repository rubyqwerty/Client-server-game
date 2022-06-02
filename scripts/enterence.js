function enter() {

    let login = $('#LOGIN');
    let password = $('#PASSWORD');

    $.ajax({
        url: '/PHP/enter.php',
        method: 'get',
        dataType: 'json',
        data: {"login": login.val(), "password": password.val()},
        success: function (data) {
            console.log(data);
            let errors = data;
            $('#error-enter').text(errors['enter']);

            if (errors['status'] == true) {
                window.location.href = 'account.html';
                localStorage['currentuser'] = errors['user'];
                localStorage['currentlogin'] = errors['loginuser'];
            }
        }
    });
}

function OpenSignUp() {
    window.location.href = 'signup.html';
}

function signup() {
    let login = $('.Login');
    let password = $('.Password');
    let email = $('.Email');
    $.ajax({
        url: '/PHP/signup.php',
        method: 'get',
        dataType: 'json',
        data: {"login": login.val(), "password": password.val(), "email": email.val()},
        success: function (data) {
            console.log(data);
            let errors = data;
            $('#logerr').text(errors['login']);
            $('#passerr').text(errors['password']);
            $('#emailerr').text(errors['email']);
            if (errors['status'] == true) {
                window.location.href = 'index.html';
            }
        }
    });
}

function back() {
    localStorage['currentuser'] = 'exit';
    localStorage['currentlogin'] = 'exit'
    window.location.href = 'index.html';
}

function CurrentUser() {
    if (localStorage['currentuser'] == 'exit')
        window.location.href = 'index.html';
    else
        $('.user').text('Привет, ' + localStorage['currentuser'] + '!');
}

function Exit() {
    window.location.href = 'index.html';
    localStorage.clear();
    $.ajax({
        url: '/PHP/clear.php',
        method: 'get',
        dataType: 'json',
        data: {},
        success: function (data) {
           
        }
    });
}

function Play() {
    window.location.href = 'Game.html';
}

function Statistic() {
    window.location.href = 'statistic.html';
}

function main(){
    window.location.href = 'account.html';
}

function setting(){
    window.location.href = 'settings.html';
}



function createtable(database){
    console.log(database);
    let tableblock = $("#table");
    var table = '<table class="table_dark"><tr> <td>Номер попытки</td> <td>Уровень</td> <td>Дата попытки</td>';
    for (var counter = 1; counter <= Object.keys(database['base'][database['userlogin']]['games']).length; counter++){
    
        var score = database['base'][database['userlogin']]['games'][counter]['score'];
        var datap =  database['base'][database['userlogin']]['games'][counter]['time'];
        table += '<tr>';
        table += '<td>№'+counter + '</td>';
        table += '<td>'+score + '</td>';
         table += '<td>'+datap + '</td>';
        
        table += '</tr>';
    }
    table += '</table>'
    tableblock.html(table);
  }

function givebase(){
    $.ajax({
        url: '/PHP/base.php',
        method: 'get',
        dataType: 'json',
        data: {},
        success: function (data) {
           createtable(data)
        }
    });
}

