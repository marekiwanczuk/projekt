window.onload = function(){

    var BODY = this.document.querySelector('body'),
        btn_menu = this.document.querySelector('[data-menu-btn]'),
        //video
        video_mod = this.document.querySelector('[data-video]'),
        video_el = video_mod.querySelector('video'),
        btn_pause = video_mod.querySelector('[data-pause-btn]'),
        btn_play = video_mod.querySelector('[data-play-btn]'),
        vid_progress = video_mod.querySelector('[data-progress]'),
        is_playing = false
        //form 
        form_mod = this.document.querySelector('.form'),
        form_el = form_mod.querySelector('form'),
        form_req = form_mod.querySelectorAll('[required]')

    ;

    // hamburger menu
    btn_menu.onclick = function(){
        BODY.classList.toggle('open-menu');
    };

    // video control
    btn_play.onclick = function(){
        video_el.play();
        is_playing = true;
        video_mod.classList.add('is-playing');
    };
    btn_pause.onclick = function(){
        video_el.pause();
        is_playing = false;
        video_mod.classList.remove('is-playing');
    };
    video_el.ontimeupdate = function(){
        vid_progress.style.width = Math.ceil(video_el.currentTime / video_el.duration * 100) + '%';
    };
    video_el.onended = function(){
        video_el.currentTime = 0;
        video_el.pause();
        is_playing = false;
        video_mod.classList.remove('is-playing');
    };

    //form submit
    form_el.onsubmit = function(event){
        event.preventDefault();

        form_el.classList.add('is-submitted');
        var isError = false;

        for (var i=0; i < form_req.length; i++){
            if ( form_req[i].checkValidity() != true ){
                isError = true;
            }
        }

        if (!isError){
            // base js send post
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    alert('form send');
                    
                    form_el.classList.remove('is-submitted');
                    form_el.reset();
                }
            };
            xhttp.open("POST", "https://httpstat.us/200", true);
            xhttp.send(new FormData(form_el));
        }else{
            console.log('there are some not property validated fields')
        }

    }

    //loader hidding

    setTimeout(function(){
        BODY.classList.add('loaded');
    }, 500);


    // slider init
    var mySwiper = new Swiper ('.swiper-container', {
        // Optional parameters
        loop: true,
        // If we need pagination
        pagination: {
          el: '.swiper-pagination',
        },
        // Navigation arrows
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }

      });


};


// header animation

var hdrData = {
    element: document.querySelector('[data-js=header]'),
    scrollPosition: 0,
    ticking: false,
    state: 'top'
};

if( hdrData.element ){
    window.addEventListener('scroll', function onScroll(){

        hdrData.scrollPosition = window.pageYOffset;

        if (!hdrData.ticking) {
            window.requestAnimationFrame(function() {
                scrollCallback(hdrData.scrollPosition);
                hdrData.ticking = false;
            });
            hdrData.ticking = true;
        }
    });
}

function scrollCallback(position){
    //console.log("scrollCallback:", position);
    if( position > 1 ){
        if( hdrData.state !== 'moving' ){
            hdrData.state = 'moving';
            hdrData.element.classList.add('compact');
        }
    }
    else {
        if( hdrData.state !== 'top' ){
            hdrData.state = 'top';
            hdrData.element.classList.remove('compact');
        }
    }
}
