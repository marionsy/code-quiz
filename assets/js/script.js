// Gets references to elements
var timerElement = document.querySelector("#timer");
var timeLeftElement = document.querySelector("#timeLeft");
var timesUp = document.querySelector("#timesUp");

var startDiv = document.querySelector("#start");
var startButton = document.querySelector("#start-button");
var questionDiv = document.querySelector("#questionDiv");
var questionTitle = document.querySelector("#questionTitle");

var optionA = document.querySelector("#btn1");
var optionB = document.querySelector("#btn2");
var optionC = document.querySelector("#btn3");
var optionD = document.querySelector("#btn4");

var checkAnswer = document.querySelector("#checkAnswer")


var summary = document.querySelector("#summary");
var initialInput = document.querySelector("#initialInput")
var submitInitials = document.querySelector("#submitInitials");


var viewHighScore = document.querySelector("#viewHighScore");
var finalScore = document.querySelector("#finalScore");
var highScoreSection = document.querySelector("#highScoreSection");
var listOfHighScores = document.querySelector("#listOfHighScores");

var goBackButton = document.querySelector("#goBackButton");
var clearHighScoreButton = document.querySelector("#clearHighScoreButton");

// Define variables
var questionIndex = 0;
var correctAnswer = 0;
var score = 0;
var timer;
var timerCount;
var sections = [startDiv, questionDiv, summary, highScoreSection];

var questions = [
    {
        title: "How do you call a function named 'myFunction'?",
        options: ["a. callmyFunction()", "b. myFunction()", "c. call function myFunction", "d. Call.myFunction()"],
        answer: "b. myFunction()"
    },
    {
        title: "Inside which HTML element do we put the Javascript?",
        options: ["a. <javascript>", "b. <js>", "c. <script>", "d. <scripting"],
        answer: "c. <script>"
    },
    {
        title: "Commonly used data types do not include:",
        options: ["a. alerts", "b. strings", "c. booleans", "d. numbers"],
        answer: "a. alerts"
    },
    {
        title: "Arrays in Javascript can be used to store:",
        options: ["a.numbers and strings", "b. other arrays", "c. booleans", "d. all of the above"],
        answer: "d. all of the above"
    },
    {
        title: "A very useful tool used during development and debugging for printing content to the debugger is:",
        options: ["a. Javascript", "b. console log", "c. terminal/bash", "d. for loops"],
        answer: "b. console log"
    },
    {
        title: "The condition in an if/else statement is enclosed within:",
        options: ["a. quotes", "b. curly brackets", "c. parentheses", "d. square brackets"],
        answer: "c. parentheses"
    },
];

// Function to start quiz
function startQuiz() {
    timerCount = 120;
    startTimer();
    newQuiz();
}

// Function to start timer
function startTimer() {
    timer = setInterval(function () {
        timerCount--;
        timeLeftElement.textContent = timerCount;
        if (timerCount <= 0) {
            clearInterval(timer);
        }
    }, 1000);
}

function newQuiz() {
    // Display the questions and answers
    displaySection(questionDiv);

    // Hide the answer text
    checkAnswer.style.display = 'none';

    // Reset the questionIndex
    questionIndex = 0;

    // Reset the score 
    score = 0;

    // Set the questions
    displayQuestion();
}

// Function to check users answer 
function answerCheck(userAnswer) {

    var currentQuestion = questions[questionIndex];

    if (currentQuestion.answer === currentQuestion.options[userAnswer]) {
        checkAnswer.textContent = "Correct!";
        score++;
    } else {
        timerCount -= 10;
        timeLeftElement.textcontent = timerCount;
        checkAnswer.textContent = "Wrong! The correct answer is " + currentQuestion.answer;
    }

    // Display the answer text
    checkAnswer.style.display = 'block';

    if (questionIndex < questions.length - 1) {
        questionIndex++;
        displayQuestion();
    } else {
        displayQuizOver();
    }
}

// Function to display questions
function displayQuestion() {
    questionTitle.textContent = questions[questionIndex].title;
    optionA.textContent = questions[questionIndex].options[0];
    optionB.textContent = questions[questionIndex].options[1];
    optionC.textContent = questions[questionIndex].options[2];
    optionD.textContent = questions[questionIndex].options[3];
}

// Function to display quiz over
function displayQuizOver() {
    // Set the final score
    score = score * 5;

    // Stop the timer
    clearInterval(timer);

    displaySection(summary);

    // Update score
    finalScore.textContent = score;

}

// Function to add high scores and store in local storage
function addHighScore(event) {
    event.preventDefault();

    // Get the old high scores (could be empty)
    var highScores = JSON.parse(localStorage.getItem("highScores"));

    // Create a new object for the new high score
    var newScore = {
        initials: initialInput.value,
        score: score
    };

    // If adding first score, create new object
    if (highScores === null) {
        highScores = [];
    }

    // Add the new high score
    highScores.push(newScore);

    // Update localStorage
    localStorage.setItem("highScores", JSON.stringify(highScores));


    // Show all high scores
    displayHighScores();
}

function displayHighScores() {
    // Clear existing high scores
    listOfHighScores.textContent = '';

    // Get the high scores from local storage
    var highScores = JSON.parse(localStorage.getItem("highScores"));

    // Create new paragraph and append for each high score if there are any
    if (highScores !== null) {
        for (i = 0; i < highScores.length; i++) {
            var p = document.createElement("p");
            p.textContent = (i + 1) + ". " + highScores[i].initials + " - " + highScores[i].score;
            listOfHighScores.appendChild(p);
        }
    }

    // Display high score section
    displaySection(highScoreSection);
}

// Function to display each div when called
function displaySection(divToDisplay) {
    for (i = 0; i < sections.length; i++) {
        if (sections[i] === divToDisplay) {
            divToDisplay.style.display = 'block';
        } else {
            sections[i].style.display = 'none';
        }
    }
}

// Function to return to start page and take quiz again
function displayStartPage() {
    timeLeftElement.textContent = 0;
    displaySection(startDiv);
}

// Function to clear high scores
function clearHighScores() {
    localStorage.setItem("highScores", null);
    displayHighScores();
}

// Function for button handling
function chooseA() { answerCheck(0); }
function chooseB() { answerCheck(1); }
function chooseC() { answerCheck(2); }
function chooseD() { answerCheck(3); }

// Add event listeners to buttons
startButton.addEventListener("click", startQuiz);
optionA.addEventListener("click", chooseA);
optionB.addEventListener("click", chooseB);
optionC.addEventListener("click", chooseC);
optionD.addEventListener("click", chooseD);
submitInitials.addEventListener("click", addHighScore);
goBackButton.addEventListener("click", displayStartPage);
viewHighScore.addEventListener("click", displayHighScores);
clearHighScoreButton.addEventListener("click", clearHighScores)