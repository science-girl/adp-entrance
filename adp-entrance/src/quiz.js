
$(document).ready(function(){

  var score = 0;
  var currentQuiz = '';
  var currentQuestion = 0;
  var currentQuestionObj = '';
  var maxQuestions = '0';
  var successMessage = 'Well Done!';
  var failureMessage = 'Maybe Next Time!';
  var quizzes = '';

  $('#quiz').hide();

 $.getJSON("https://api.myjson.com/bins/z14d3", function(data){
   quizzes = data;
   console.log(quizzes.quizzes[0]);
 });

  //
  // loads the quiz for the first time.
  // @param name of the quiz chosen by the user.
  //
  function loadQuiz(quizName){
    // load quiz
    if(quizName == 'quiz1'){
      currentQuiz = quizzes.quizzes[0];
      console.log(quizzes.quizzes[0].title);
    }
    else if(quizName == 'quiz2'){
      currentQuiz = quizzes.quizzes[1];
      console.log(quizzes.quizzes[1].title);
    }

    // hide the quiz quizButtons
    $('#quizButtons').hide();

    // TODO: possibly remove set scoreCounter
    //$('#score').text('Score: ' + score);

    // display the first question for the quiz specified
    $('#quiz').show();
    $('#quizTitle').text('Q: ' + currentQuiz.questions[currentQuestion].question);
    currentQuestionObj = currentQuiz.questions[currentQuestion];
    // set max number of questions:
    maxQuestions = currentQuiz.questions.length;
    // load 4 buttons with answers
    loadAnswerButtons();
  }

  //
  // loads 4 answer options as buttons for the current question
  //
  function loadAnswerButtons(){
    $("button[id='answer0']").text(currentQuestionObj.answers[0].content);
    $("button[id='answer1']").text(currentQuestionObj.answers[1].content);
    $("button[id='answer2']").text(currentQuestionObj.answers[2].content);
    $("button[id='answer3']").text(currentQuestionObj.answers[3].content);
  }

  //
  // compares user response to expected response.
  // @params answer given by the user, name of the button clicked
  //
  function checkAnswer(answer, buttonName){
    // if the answer is correct, increment score and highlight green
    if(answer == true){
      score += 1;
      displaySuccessMessage();
  }
    // if the answer is incorrect, leave score as it is and highlight ready
    else {
      displayFailureMessage();
    }
  }

  //
  // adds HTML for a success message and score information
  //
  function displaySuccessMessage(){
    $("#correct").html('<div class="alert alert-success"><p class="text-center"><b>'+ successMessage
    + '</b></p><p> You have correctly answered ' + score + ' of ' + maxQuestions + ' possible questions</p></div>');
  }

  //
  // adds HTML for a failure message and score information
  //
  function displayFailureMessage(){
    $("#correct").html('<div class="alert alert-danger"><p class="text-center"><b>'+ failureMessage
    + '</b></p><p> You have correctly answered ' + score + ' of ' + maxQuestions + ' possible questions</p></div>');
  }

  //
  // loads the next question from the JSON file.
  //
  function loadNextQuestion(){
    // increment to next question:
    currentQuestion++;
    if( currentQuestion == maxQuestions ){
      displayFinalScore();
    }
    else{
      // new question:
      currentQuestionObj = currentQuiz.questions[currentQuestion];
      $('#quizTitle').text('Q: ' + currentQuestionObj.question);
      // load new answers:
      loadAnswerButtons();
    }

  }

  //
  // displays the final score and pass/fail
  //
  function displayFinalScore(){
    // hide question and answer fields:
    $('#quiz').hide();

    if(Number(score) < Number(maxQuestions / 2)){
      displayFailureMessage();
      $('#quizTitle').html('<h3 class="text-center text-danger">' + 'Fail! Hit the Books and Try Again!' + '</h3>');
    }
    else{
      displaySuccessMessage()
      $('#quizTitle').html('<h3 class="text-center text-success">' + 'Pass! You are as smart as you thought :-)' + '</h3>');
    }
  }

  $("button[id='answer0']").click(function(){
    // check the value corresponding to this button
    var answer = currentQuestionObj.answers[0].value;
    checkAnswer(answer, 'answer0');
    loadNextQuestion();
  });
  $("button[id='answer1']").click(function(){
    // check the value corresponding to this button
    var answer = currentQuestionObj.answers[1].value;
    checkAnswer(answer, 'answer1');
    loadNextQuestion();
  });
  $("button[id='answer2']").click(function(){
    // check the value corresponding to this button
    var answer = currentQuestionObj.answers[2].value;
    checkAnswer(answer, 'answer2');
    loadNextQuestion();
  });
  $("button[id='answer3']").click(function(){
    // check the value corresponding to this button
    var answer = currentQuestionObj.answers[3].value;
    checkAnswer(answer, 'answer3');
    loadNextQuestion();
  });

  $("button[id='quiz1']").click(function(){
    // load quiz1 from JSON file
    loadQuiz('quiz1');

  });
  $("button[id='quiz2']").click(function(){
    // load quiz2 from JSON file
    loadQuiz('quiz2');
  });
});
