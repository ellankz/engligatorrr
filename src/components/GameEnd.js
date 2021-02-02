import { createElement } from '../helpers/createElement';
import { loadBackground } from '../helpers/loadBackground';

const winSrc = require('../images/result/win.png').default;
const failSrc = require('../images/result/fail.png').default;

const WIN_TEXT = 'You won!';
const LOSE_TEXT = 'You lost!';

export class GameEnd {
  constructor(main) {
    this.main = main;
  }

  async render(score) {
    const text = score.incorrect === 0 ? WIN_TEXT : LOSE_TEXT;
    const imgSrc = score.incorrect === 0 ? winSrc : failSrc;
    try {
      await loadBackground(imgSrc);
    } catch (err) {
      throw new Error('Error loading End game picture');
    }
    const errorsText = score.incorrect === 0 ? '' : `You made ${score.incorrect} mistake${score.incorrect % 10 !== 1 && score.incorrect === 11 ? 's' : ''}.`;
    this.main.innerHTML = '';
    createElement('div', ['game-result'], this.main, [
      createElement('div', ['game-result__text-wrap'], undefined, [
        createElement('h2', ['game-result__text'], undefined, [text]),
        createElement('h3', ['game-result__score'], undefined, [errorsText]),
      ]),
      createElement('div', ['game-result__image-wrap'], undefined, [
        createElement('img', ['game-result__image'], undefined, undefined, undefined, [{ name: 'src', value: imgSrc }]),
      ]),
    ]);
    document.dispatchEvent(new Event('rendergameend'));
  }
}
