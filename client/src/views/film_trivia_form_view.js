const FilmTrivia = require('../models/film_trivia.js');
const PubSub = require('../helpers/pub_sub.js');

const FilmTriviaFormView = function(filmTriviaForm) {
  this.filmTriviaForm = filmTriviaForm;
  filmTrivia = new FilmTrivia;
};

FilmTriviaFormView.prototype.bindEvents = function () {
  PubSub.subscribe('FilmTrivia:items-ready', (evt) => {
    this.questions = evt.detail;
    // const newQuestion = filmTrivia.newQuestion(this.questions);
    const randomObject = filmTrivia.newQuestion(this.questions);

    const question = randomObject.question;
    const answers = filmTrivia.answers(randomObject);
    filmTrivia.populateQuestion(question);
    filmTrivia.populateAnswers(answers);

    const teamBuzzer = document.querySelector('.team-buzzer');
    console.log(teamBuzzer);

    // teamBuzzer.addEventListener('click', (evt) => {
    //   this.handleClick(evt);
    // });

    const correctAnswer = randomObject.correct_answer;
    this.boxes = document.querySelectorAll('.p');

    for (var i = 0; i < this.boxes.length; i++) {
      this.boxes[i].addEventListener('click', (evt) => {
        if (evt.target.innerText === correctAnswer) {
          PubSub.publish('FilmTriviaForm:answer', true);
          filmTrivia.bigAnswerText(correctAnswer, true);
          filmTrivia.textBox();
        } else {
          PubSub.publish('FilmTriviaForm:answer', false);
          filmTrivia.bigAnswerText(correctAnswer, false);
        }
      });
    };
  });
};

module.exports = FilmTriviaFormView;


FilmTriviaFormView.prototype.handleSubmit = function (evt) {
  evt.preventDefault();
  const teamSelected = evt.target.id;
  PubSub.publish('FilmTriviaForm:team-selected', teamSelected);

  evt.target.reset();
};
