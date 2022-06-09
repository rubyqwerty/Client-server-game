$(function () {
    $('html, body').css({
        overflow: 'hidden',
    });
    $('#loseblock').hide();
    $('#loseblock').offset({top: "100", left: "350"})
    $('.bt1').offset({top: 35});
    $('.lives').offset({left: '640', top: '30'});
    $('.win1').hide();
    $('.win1').offset({top: '50'});
   $(document).mousemove(function(e){
    var X = e.pageX; // положения по оси X
    var Y = e.pageY; // положения по оси Y
    console.log("X: " + X + " Y: " + Y); // вывод результата в консоль
}); 

});

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
            $("#schet").html((Number(localStorage['schet']) + 1) + '<h6>Уровень</h6> ');
        }
    });
}

localStorage['schet'] = 0;

function checkposition(postop, posleft, currentdrot) {

    let dates = {
        'centtop': 402,
        'centleft': 625,
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
                
                $('.win1').show();
                setTimeout(function () {
                           $('.win1').hide();
                           $('.pole').empty();
                           start();
                        }, 500);
                
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
    if (seconds < 10)
        seconds = `0${seconds}`;
    return `${minutes}:${seconds}`;
}
localStorage['lives'] = 5;
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
                if (data['lives'] == 0)
                    k = 1;
                if (localStorage['lives']!=data['lives']){
                    start();
                $('.pole').empty();}
                localStorage['lives'] = data['lives'];
                for (var i = 0; i < data['lives'] + k; ++i)
                    $('.lives').append('<img class = "heart" src="pictures/serdce.png" alt=""/>')
                if (data['status'] == false) {
                    clearInterval(timerInterval);
                    $('.pole').hide(1500);
                    $('.pole').empty();
                    $('#time').hide();
                    $('#loseblock').show(1500);
                    setTimeout(function () {
                        $('#loseblock').hide(500);
                        setTimeout(function () {
                            end();
                        }, 500);

                    }, 5000);
                }
            }
        });
    }, 1000);
}

function end() {
    $.ajax({
        url: '/PHP/endgame.php',
        method: 'get',
        dataType: 'json',
        data: {},
        success: function (data) {
            console.log(data);
        }
    });
    window.location.href = 'account.html';
}