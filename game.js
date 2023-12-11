var btnClr=["red","blue","green","yellow"];
var gmPtrn=[];
var clickd=[];
var started=false;
var lev=0;
$(document).keypress(function(){
    if(!started){
        $("#level-title").text("level "+lev);
        nxtSeq();
        started=true;
    }
});
$(".btn").click(function(){
    var userChosenColour=$(this).attr("id");
    clickd.push(userChosenColour);
    playSound(userChosenColour);
    animatepress(userChosenColour);
    checkAns(clickd.length-1);

});

function checkAns(currLvl){
    if(gmPtrn[currLvl]===clickd[currLvl]){
        if(gmPtrn.length===clickd.length){
            setTimeout(function(){
                nxtSeq();
            },1000);
        }
    }
    else{
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("#level-title").text("Game Over. Press Any Key To Restart ");
        startOver();

    }

}

function nxtSeq(){
    clickd=[];
    lev++;
    $("#level-title").text("level "+lev);
    var radmNo=Math.floor(Math.random()*4);  
    var rndmchosnclr=btnClr[radmNo];
    gmPtrn.push(rndmchosnclr);
    $("#"+rndmchosnclr).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(rndmchosnclr);
    
}
function playSound(name){
    var audio=new Audio("sounds/" +name+".mp3");
    audio.play();

}
function animatepress(currClr){
    $("#"+currClr).addClass("pressed");
    setTimeout(function(){
        $("#"+currClr).removeClass("pressed");
    },100);
}
function startOver(){
    gmPtrn=[];
    started=false;
    lev=0;
}
