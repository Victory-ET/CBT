const  container = document.querySelector(".counter");
const butt =document.querySelector(".buttons");

var seconds, remseconds, minutes;

function submit(){
    window.open("end.html", "_top");
}

seconds=60;

function count(){
    if(seconds > 0){
        if(tocount=true){
            seconds--;
            remseconds = seconds % 60;
            minutes = Math.floor(seconds/60);
            if(minutes < 10){
                minutes= "0" + minutes;
            }
        
            if(seconds < 10){
                remseconds= "0" + seconds;
            }
            container.innerHTML = minutes + " : " + remseconds;
            
        }
    }
    else {
        window.open("end.html", "_top");
    }
}

window.addEventListener("load",function(){
    var tocount = true;
    this.setInterval(count, 1000);

});
