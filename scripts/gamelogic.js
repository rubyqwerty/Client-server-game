$(function(){
    $('html, body').css({
    overflow: 'hidden',
});
$('#loseblock').hide();
$('.bt1').offset({top : 90, left : 10});
})

function start() {
    $.ajax({
        url: '/PHP/start.php',
        method: 'get',
        dataType: 'json',
        data: {},
        success: function (data) {
       console.log(data);
            $('.pole').append(data['pole']);
            
            
          
            print(data);
           
            $("#schet").text('Уровень: ' + localStorage['schet']);
            
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
        'curdrot': currentdrot
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
    $('#value2-1').offset(data['value2-1css']);
    $('#value3-1').offset(data['value3-1css']);
    $('#value4-1').offset(data['value4-1css']);
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

    let timerInterval = setInterval(() => {
    $.ajax({
        url: '/PHP/timer.php',
        method: 'get',
        dataType: 'json',
        data: {},
        success: function (data) {
           $('#time').text(formatTime(data['time']));
           $('.lives').empty();
           var k = 0;
           if (data['lives'] == 0) k = 1;
           for (var i = 0; i < data['lives'] + k; ++i)
                $('.lives').append('<img class = "heart" src="pictures/serdce.png" alt=""/>')
           if (data['status'] == false){
               clearInterval(timerInterval);
               $('.pole').hide(1500);
               $('#loseblock').show(1500);
               setTimeout(function(){
                $('#loseblock').hide(500);
                end();
                }, 5000);
           }
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
            
        },
        success: function (data) {
           console.log(data);
        }
    });
    setTimeout(function(){
        window.location.href = 'account.html';
    }, 500);
   
}