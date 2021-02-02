import { createElement } from '../helpers/createElement';

const fullStarSrc = require('../images/star.png').default;
const emptyStarSrc = require('../images/star-empty.png').default;

export class GameScore {
  constructor(root) {
    this.root = root;
    this.count = {
      correct: 0,
      incorrect: 0,
    };
    this.element = null;
  }

  init() {
    this.element = createElement('div', ['score'], this.root);
    this.render();
    return this;
  }

  render() {
    this.element.innerHTML = '';
    const correctStars = [];
    for (let i = 0; i < this.count.correct; i += 1) {
      correctStars.push(GameScore.renderStar(true));
    }
    const incorrectStars = [];
    for (let i = 0; i < this.count.incorrect; i += 1) {
      incorrectStars.push(GameScore.renderStar(false));
    }
    createElement('div', ['score__stars'], this.element, [
      createElement('div', ['score__stars__wrap_correct', 'score__stars__wrap'], undefined, correctStars),
      createElement('div', ['score__stars__wrap_incorrect', 'score__stars__wrap'], undefined, incorrectStars),
    ]);
  }

  static renderStar(isCorrect) {
    const starClass = isCorrect ? 'score__star_correct' : 'score__star_incorrect';
    const image = createElement('img', ['score__star__image']);
    image.src = isCorrect ? fullStarSrc : emptyStarSrc;
    image.alt = 'Star';
    return createElement('div', ['score__star', starClass], undefined, [image]);
  }

  addCorrect() {
    this.count.correct += 1;
    this.render();
  }

  addIncorrect() {
    this.count.incorrect += 1;
    this.render();
  }

  reset() {
    this.count = {
      correct: 0,
      incorrect: 0,
    };
    this.render();
  }
}
