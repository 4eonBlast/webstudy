const body = document.querySelector("body");

const IMG_NUMBER = 3;


function paintImage(imgNumber){
    const image = new Image();
    image.src = `images/${imgNumber}.jpeg`;
    image.classList.add("bgImage");
    body.prepend(image);
    
}

function genRandom(){
    const number = Math.floor(Math.random()* IMG_NUMBER);
    
    return number;
}
// 랜덤 숫자 생성하는 방법 숙지. Math.random() * ~ -> 소수점으로 나오는데
// Math.floor/ceil 을 이용해 정수로 올림,내림 연산

function init(){
    const randomNumber =genRandom();
    paintImage(randomNumber);
}

init();