var  slides = document.querySelectorAll("#container .sliderConteneur");
var next = document.getElementById('next');
var prev = document.getElementById('prev');
var currentSlide = 0;
var slideInterval = setInterval(nextSlide, 5000);


next.onclick = function(){
    pauseSlideshow();
    nextSlide();
}

prev.onclick = function(){
    pauseSlideshow();
    prevSlide();
}


// fonction prochaine slide 
function nextSlide(){
    goToSlide(currentSlide+1);
}

function prevSlide(){
    goToSlide(currentSlide-1);
}

function goToSlide(n){
    slides[currentSlide].className = 'sliderConteneur';
    currentSlide = (n+slides.length)%slides.length;
    slides[currentSlide].className = 'sliderConteneur showing';
}

// Boutton play et pause

var playing = true;
var pauseButton = document.getElementById("pause");

function pauseSlideshow(){
    pauseButton.innerHTML = '&#9658;';
    playing = false;
    clearInterval(slideInterval);
}

function playSlideshow(){
    pauseButton.innerHTML = '&#10074;&#10074;';
    playing = true;
    slideInterval = setInterval(nextSlide, 5000);
}


pauseButton.onclick = function(){
    if(playing){
        pauseSlideshow();
    }else{
        playSlideshow();
    }
};

//Accéssibilité
var controls = document.querySelectorAll('.controls');
for(var i=0; i<controls.length; i++){
    controls[i].style.display = 'inline-block';
}

// Touche
document.onkeydown = function(e) {
    switch (e.keyCode) {
        case 37:
            prevSlide()
            break;
        case 39:
            nextSlide()
            break;
    }
};

