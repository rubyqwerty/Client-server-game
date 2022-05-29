$(function(){
    $('html, body').css({
    overflow: 'hidden',
   
     
});
$('.bt1').offset({top : 10, left : 10});
})

function start() {
    $.ajax({
        url: '/PHP/start.php',
        method: 'get',
        dataType: 'json',
        data: {},
        success: function (data) {
            
            localStorage['drot1'] = data['startpos'];
            localStorage['drot2'] = data['startpos'];
            localStorage['drot3'] = data['startpos'];
            localStorage['drot4'] = data['startpos'];
            localStorage['zone1'] = data['zones']['zone1'];
            localStorage['zone2'] = data['zones']['zone2'];
            localStorage['zone3'] = data['zones']['zone3'];
            localStorage['zone4'] = data['zones']['zone4'];
            localStorage['purpose'] = data['purpose'];
            $('.pole').append(data['pole']);
            print(data);
            $("#schet").text('Счет: ' + localStorage['schet']);
            
        }
    });
}

localStorage['schet'] = 0;
localStorage['time'] = 0;

function checkposition(postop, posleft, currentdrot) {

    let dates = {
        'centtop': $('#circle1').offset().top,
        'centleft': $('#circle1').offset().left,
        'objtop': postop,
        'objleft': posleft,
        'circle1': $('#circle1').css('width'),
        'circle2': $('#circle2').css('width'),
        'circle3': $('#circle3').css('width'),
        'circle4': $('#circle4').css('width'),
        'drot1': localStorage['drot1'],
        'drot2': localStorage['drot2'],
        'drot3': localStorage['drot3'],
        'drot4': localStorage['drot4'],
        'zone1': localStorage['zone1'],
        'zone2': localStorage['zone2'],
        'zone3': localStorage['zone3'],
        'zone4': localStorage['zone4'],
        'curdrot': currentdrot,
        'purpose': localStorage['purpose'],
        'schet': localStorage['schet']
    };

    $.ajax({
        url: '/PHP/checkpos.php',
        method: 'get',
        dataType: 'json',
        data: dates,
        success: function (data) {
            localStorage[currentdrot] = data['zone'];
            $('#score').text('Очки: ' + data['score']);
            if (data['status'] == true) {
                $('.pole').empty();
                start();
                localStorage['schet'] = data['schet'];
            }
        }
    });

}


function print(data) {


    $("#drot1").draggable({
        containment: "parent",
        stop: function () {
            checkposition($("#drot1").offset().top, $("#drot1").offset().left, 'drot1');
        }
    });

    $("#drot2").draggable({
        containment: "parent",
        stop: function () {
            checkposition($("#drot2").offset().top, $("#drot2").offset().left, 'drot2');
        }
    });

    $("#drot3").draggable({
        containment: "parent",
        stop: function () {
            checkposition($("#drot3").offset().top, $("#drot3").offset().left, 'drot3');
        }
    });

    $("#drot4").draggable({
        containment: "parent",
        stop: function () {
            checkposition($("#drot4").offset().top, $("#drot4").offset().left, 'drot4');
        }
    });

    $("#drot1").offset(data['drot1css']);
    $("#drot2").offset(data['drot2css']);
    $("#drot3").offset(data['drot3css']);
    $("#drot4").offset(data['drot4css']);
    $('#value1').offset(data['value1css']);
    $('#value2').offset(data['value2css']);
    $('#value3').offset(data['value3css']);
    $('#value4').offset(data['value4css']);
    $('#circle4').css(data['circle4css']);
    $('#circle3').css(data['circle3css']);
    $('#circle2').css(data['circle2css']);
    $('#circle1').css(data['circle1css']);
    $('.purpose').offset(data['purposecss'])
    $('#score').offset(data['scorecss']);
    $('#schet').offset(data['schetcss']);
    $('#time').offset(data['timecss']);
}

function formatTime(time) {
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;
    if (seconds < 10){
        seconds = `0${seconds}`;
    }
    return `${minutes}:${seconds}`;
}


function startTimer() {

    timerInterval = setInterval(() => {
    $.ajax({
        url: '/PHP/timer.php',
        method: 'get',
        dataType: 'json',
        data: {"time" : localStorage['time']},
        success: function (data) {
           $('#time').text(formatTime(data['time']));
           localStorage['time'] = data['time'];
        }
    });
    }, 1000);
}

function end(){
    $.ajax({
        url: '/PHP/endgame.php',
        method: 'get',
        dataType: 'json',
        data: {
            'user' : localStorage['currentlogin'], 
            'timeprint' : formatTime(localStorage['time']) , 
            'time' : localStorage['time'],
            'score' : localStorage['schet']
        },
        success: function (data) {
           
        }
    });
     window.location.href = 'account.html';
}