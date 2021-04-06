var score = 0;
var questionIndex = 0;
var checkCorrectAnswer = 0;

//questions
var questionNanswer = [
    {
        title: "What is the square root of 49?",
        answers: ["A: 2","B: 7","C: 4","D: 5"],
        correct: 1 //index of array
    },
    {
        title: "9/3",
        answers: ["A: 2","B: 27","C: 3","D: 4"],
        correct: 2 //index of array
    },
    {
        title:"12*4",
        answers: ["A: 3","B: 36","C: 48","D: 44"],
        correct: 2 //index of array
    },
    {
        title:"15+18",
        answers: ["A: 33","B: 22","C: 29","D: 31"],
        correct: 0 //index of array
    }
]

//timer function
var timerLeft = 60;
var timer;
var timerContainerSpan = $(".timer-count")
var timerContainerDev = $(".timer-text")


function startTimer(){
    timer = setInterval(function() {
        timerLeft--;
        if(timerLeft === 0){
            alert("Time Up");
            $(".questionPage").hide();
            $(".summaryPage").show();
            timerLeft = 60;
            clearInterval(timer);
        }
        $(".timer-count").text(timerLeft);
    
    },1000);
}

//when start button is clicked
$("#startButton").on("click", function(event){
    event.preventDefault();
    $(".mainPage").hide();
    startTimer();
    $(".questionPage").show();
    showQuestion();
})

$("#options").on("click","button",function(){
    $(".selectedButton").removeClass("selectedButton")
    $(this).addClass("selectedButton")

    if($("selectedButton").length){
        var selectedButton = parseInt($("button.selectedButton").prop("id"))
        checkAnswer(selectedButton)
    }else{
        alert("Select an Option")
    }

})

var questionIndex = 0

//Display questions and answer
function showQuestion(){
    var question = questionNanswer[questionIndex]
    $("#question-title").text(question.title)
    $("#options").html("")

    for(var i=0; i < question.answers.length; i++){
        $("#options").append("<li><button class='btn btn-primary btn-lg m-1' id='" +i
        + "'>" + question.answers[i]+ "</button></li>") 


    }
}

//check answer
function checkAnswer(selectedButton){
    var question = questionNanswer[questionIndex];

    if(question.correct === selectedButton){
        score = score + 10
        checkCorrectAnswer += 1
        $("#status").text("Correct!")
    }else{
        timerLeft=timerLeft - 10;
        timerContainerSpan.text(timerLeft)
        $("#status").text("Wrong")
    }
    questionIndex++;
    if(questionIndex >= questionNanswer.length){
        summaryPage()
    }else{
        questionPage()
    }
}

//summaryPage function
function summaryPage(){
    $(".questionPage").hide()
    $(".summaryPage").show()
    $(".finalScore").text("Your final score is" + score)
    clearInterval(interval)
}
//display highscore
function showHighScore(){
    $(".summaryPage").hide()
    $(".highScore").show()
    var highScoresList = $("#highScoresList")
    var highScores = JSON.parse(localStorage.getItem("Highscores"))//store in local storage
    highScoresList.html("")

    highScoresList.append(highScores.map(userStats => {
        return 
    }))
}
//restartquiz
function resetQuiz(){
    $("#highScore").hide()
    $("#mainPage").show()
    checkCorrectAnswer = 0
    questionIndex = 0
    score = 0
}

