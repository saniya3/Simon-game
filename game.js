buttonColours=["red", "blue", "green", "yellow"];
gamePattern=[];
userClickedPattern=[];
var started=false;
var level=0;

$(document).keypress(function(){
 if(!started){
     nextSequence();
     $("#level-title").text("Level "+level);
     started=true;
 }
})

function nextSequence(){
    userClickedPattern=[];
    level++;
    $("#level-title").text("Level "+level);
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function playSound(name){
    var audio=new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    },100);
}

function checkAnswer(currentLevel){
   if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
       if(userClickedPattern.length===gamePattern.length){
           setTimeout(function(){
               nextSequence();
           },1000);
      }
   }
   else{
       playSound("wrong");
       $("body").addClass("game-over");
       setTimeout(function(){
           $("body").removeClass("game-over");
       },200)
       $("#level-title").text("Game Over, Press Any Key to Restart");
       startOver();
   }
}

function startOver(){
    started=false;
    level=0;
    gamePattern=[];
}

$(".btn").click(function(){
    var userChosenColour=$(this).attr("id");
    userClickedPattern.push(userChosenColour);
    animatePress(userChosenColour);
    playSound(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
})
