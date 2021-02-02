import { createElement } from '../helpers/createElement';
import { Card } from './Card';

require.context('../audio', true, /\.(mp3)$/);

export class WordCard extends Card {
  constructor(title, cardData, mode, soundPlay, category) {
    super(title);
    this.imageWordSource = `./images/${category}/${title.toLowerCase()}.png`;
    this.translation = cardData.translation;
    this.gameMode = mode;
    this.soundPlay = soundPlay;
    this.category = category;
  }

  async render() {
    this.el = await super.render(this.imageWordSource);
    this.el.classList.remove('card_category');
    if (this.gameMode.mode === 'train') {
      return this.renderTrainMode();
    } if (this.gameMode.mode === 'play') {
      return this.renderPlayMode();
    }
    return this.el;
  }

  renderPlayMode() {
    this.el.classList.add('card_playing');
    this.el.addEventListener('click', () => {
      const event = new CustomEvent('playcardclick', {
        detail: {
          category: this.category,
          text: this.text,
          card: this.el,
        },
      });
      document.dispatchEvent(event);
    });
    return this.el;
  }

  renderTrainMode() {
    const cardInner = this.el.querySelector('.card__inner');
    const cardBack = createElement('div', ['card__face', 'card__face_back'], cardInner, [
      createElement('div', ['card__image'], undefined, undefined, [{ name: 'backgroundImage', value: `url("${this.imageWordSource}")` }]),
      createElement('div', ['card__info'], undefined, [
        createElement('div', ['card__text'], undefined, [this.translation]),
      ]),
    ]);
    const cardFront = cardInner.querySelector('.card__face_front');
    const cardFrontInfo = cardFront.querySelector('.card__info');
    const flipBtn = createElement('button', ['card__flip'], cardFrontInfo, ['flip']);
    flipBtn.addEventListener('click', () => this.el.classList.add('is-flipped'));
    this.el.addEventListener('mouseleave', () => this.el.classList.remove('is-flipped'));
    cardFront.addEventListener('click', (event) => {
      if (this.el.classList.contains('is-flipped')) return;
      if (!flipBtn.contains(event.target) && !cardBack.contains(event.target)) {
        this.soundPlay.playWord(this.category, this.text);
        document.dispatchEvent(new CustomEvent('statstrainclick', { detail: { category: this.category, word: this.text } }));
      }
    });
    return this.el;
  }
}
