setTimeout(function(){
     var canvas = document.createElement('canvas'); //Create a canvas element
//Set canvas width/height
canvas.style.width='100%';
canvas.style.height='100%';
//Set canvas drawing area width/height
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
//Position canvas
canvas.style.position='absolute';
canvas.style.left=0;
canvas.style.top=0;
canvas.style.zIndex=100000;
canvas.style.pointerEvents='none'; //Make sure you can click 'through' the canvas
document.body.appendChild(canvas); //Append canvas to body element
var context = canvas.getContext('2d');

var myClock = document.querySelector('.rclock.rclock-bottom'),
      opClock = document.querySelector('.rclock.rclock-top');

var board = document.querySelectorAll("cg-board")[0];
var rect = board.getBoundingClientRect();


function toSeconds(time) {
        var parts = time.trim().split(':');
        var m = parseInt(parts[0]);
        var secParts = parts[1].split('.');
        var s = parseInt(secParts[0]);
        var h = secParts.length > 1 ? parseInt(secParts[1].substr(0, 1)) : 0;
        var val = m * 60 + s + h / 10;
        return val;
    }
 function readTime(clock) {
        var timer = clock.querySelector('.time');
        return timer ? toSeconds(timer.textContent) : 0;
    }

console.log(readTime(myClock), readTime(opClock));

 var myBurner,opBurner,myTime,opTime;


    setInterval(function() {

myTime = readTime(myClock);
        opTime = readTime(opClock);
//myBurner = ((myTime - opTime) / myTime * 100);
//opBurner = ((opTime - myTime) / opTime * 100);

        if (myTime === opTime) {
            myBurner = 0;
            opBurner = 0;
        } else if (myTime > opTime) {
            myBurner = ((myTime - opTime) / myTime);
            opBurner = 0;
        } else {
            opBurner = ((opTime - myTime) / opTime);
            myBurner = 0;
        }

      context.clearRect(0, 0, canvas.width, canvas.height);


                context.beginPath();
context.rect(rect.x+rect.width/2-rect.width/9.4, rect.y+rect.width/2-4, rect.width/4*((myTime)/15), 8);
                 context.fillStyle = 'indigo';
context.fill();
context.closePath();

        context.beginPath();
context.rect(rect.x+rect.width/2, (rect.y+rect.width/2)-rect.width/2*myBurner, 15, rect.width/2*myBurner);
                 context.fillStyle = 'blue';
context.fill();
context.closePath();

        context.beginPath();
context.rect(rect.x+rect.width/2, rect.y+rect.width/2, 15, rect.width/2*opBurner);
                 context.fillStyle = 'red';
context.fill();
context.closePath();


/*
 context.beginPath();
        context.rect(rect.x*1.009, rect.y+rect.width/2-3, rect.width*((myTime)/15)+3, 6);
                 context.fillStyle = 'magenta';
context.fill();
context.closePath();


        context.beginPath();
        context.rect(rect.x*1.009, rect.y+rect.width/2-9, rect.width*((opTime)/15)+3, 6);
                 context.fillStyle = 'magenta';
context.fill();
context.closePath();
*/

//console.log(myBurner,opBurner,myTime,opTime);

        /*
document.addEventListener("keydown", function(event){

    if(event.keyCode==77){
     document.getElementsByClassName("fbt go-berserk")[0].click();
    }

});
*/






}, 100);

       }, 500);