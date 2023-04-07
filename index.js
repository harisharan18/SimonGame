var buttonColours =["red","blue", "green", "yellow"]
var gamePattern = [];
var userClickedPattern = [];
var started=false;
var level=0;



$(document).keypress(function()
{
 if(!started){
$("#level-title").text("level " + level);
nextSequence();
started =true;
 }
});

$(".btn").click(function(){
    var userChosenColour=$(this).attr("id");
    userClickedPattern.push(userChosenColour);
   buttonAnimation(userChosenColour)
   playSound(userChosenColour);
   checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]==userClickedPattern[currentLevel])
    {
        if(userClickedPattern.length==gamePattern.length){
        setTimeout(function(){
            nextSequence();
        },1000);
    }
}
    else
    {
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Gameover, press a key to restart");

    setTimeout(function(){
        $("body").removeClass("game-over")
    },200);

    startOver();
    }
}

function nextSequence(){
    userClickedPattern = [];
    level++;
    $("#level-title").text("level " + level); 
    var randomNumber = Math.floor(Math.random()*4);
var randomChoosenColour = buttonColours[randomNumber];
gamePattern.push(randomChoosenColour);
$("#" + randomChoosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
playSound(randomChoosenColour);

}

function buttonAnimation(currentcolour){
    $("#" + currentcolour).addClass("pressed");
    setTimeout(function(){
        $("#" + currentcolour).removeClass("pressed");
        },100);
    }

function playSound(name)
{
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function startOver(){
    level=0;
    gamePattern = [];
    started = false;

}