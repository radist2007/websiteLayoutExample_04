document.addEventListener('DOMContentLoaded', function(){

    // Get the video
    var video = document.getElementById("video");
    var videoVideoContent = document.getElementById("js-video__content");
    var videoBtn = document.getElementById("videoBtn");

    // Get the button
    var heroWatchVideoBtn = document.getElementById('heroWatchVideoBtn');
    var btn = document.getElementById("videoBtn");

    // Fan Fact
    let counterStarted = false;
    let time = 2;

    // hamburger.addEventListener('click', openNavBar, false);
    btn.addEventListener("click", videoPlay, false);

    //hamburger menu
    var hamburger = document.getElementById('hamburger');

    heroWatchVideoBtn.addEventListener('click', function(){
        console.log("heroWatchVideoBtn clicked");
        // Scrol to video
        // Play Video
        videoPlay();
    }, false);


    function openNavBar() {
        console.log('click on hamburger');
    }

    function videoPlay() {
        console.log("click");
        if (video.paused) {
            video.play();
            btn.innerHTML = "";
            videoBtn.classList.add('js-videoBtn');
            videoVideoContent.style.backgroundColor = "transparent";
        } else {
            video.pause();
            btn.innerHTML = "<img src='img/video_btn.png' alt='videoBtn'>";
            videoBtn.classList.remove('js-videoBtn');
            videoVideoContent.style.backgroundColor = "rgba(0,0,0,0.5)";
        }
    }

    // Fan Fact
    $(window).on("scroll", function(){
        let topWindow = $(window).scrollTop();
        let vh = $(window).height();

        if(!counterStarted) {
            $('#counter').each(function(){
                let counterPos = $(this).offset().top;
                if((counterPos < topWindow + vh / 1.5)) {
                    $('.fanFact h2').each(function(){
                        var i = 1;
                        var num = $(this).data('num');
                        var step = 1000 * time / num;
                        var that = $(this);
                        var int = setInterval(function(){
                            if(i <= num) {
                                counterStarted = true;
                                that.html(i);
                            }else{
                                clearInterval(int);
                            }
                            i++;
                        }, step)
                    })
                }
            })

        }
    })
    // Slider feedback
    var w = window.innerWidth;
    $('.js-slick__feedback').slick({
        dots: true,
        margin: '14px',
        centerPadding: '60px',
        slidesToShow: 1,
        adaptiveHeight: true,
        nextArrow: false,
        prevArrow: false,
        useCSS: true,
    });

    // Slider
    var w = window.innerWidth;
    $('.js-slick').slick({
        dots: true,
        centerMode: true,
        centerPadding: '60px',
        slidesToShow: 3,
        adaptiveHeight: true,
        nextArrow: $('.slider__next'),
        prevArrow: $('.slider__prev'),
        responsive: [
        {
            breakpoint: 768,
            settings: {
            arrows: false,
            centerMode: true,
            centerPadding: '40px',
            slidesToShow: 3
            }
        },
        {
            breakpoint: 480,
            settings: {
            arrows: false,
            centerMode: true,
            centerPadding: '40px',
            slidesToShow: 1
            }
        }
        ]
    });

    function myMap() {
        var mapOptions = {
            center: new google.maps.LatLng(48.675588, 26.572541),
            zoom: 16,
            // mapTypeId: google.maps.MapTypeId.HYBRID
        }
    var map = new google.maps.Map(document.getElementById("map"), mapOptions);
    }
    myMap();

    $( ".question__btn" ).click(function() {
        var thisHasClassActive = $(this).parent().parent().hasClass("question-active");
        if(thisHasClassActive){
            $(".question").removeClass("question-active");
        }else{
            $(".question").removeClass("question-active");
            $(".question__answer").slideUp( "slow" );
            $( this ).parent().parent().addClass("question-active");
        }
        $( this ).parent().parent().children().eq(1).slideToggle( "slow" );
    });
});



