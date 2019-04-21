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

    const correctAnswer = randomObject.correct_answer;
    this.boxes = document.querySelectorAll('.h4');

    for (var i = 0; i < this.boxes.length; i++) {
      // console.dir(this.boxes[i].innerText);
      this.boxes[i].addEventListener('click', (evt) => {
        if (evt.target.innerText == correctAnswer) {
          alert('Win!');
        } else {
          alert('Lose!');
        }
      });
    };

  });
};

module.exports = FilmTriviaFormView;