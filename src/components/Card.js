import { createElement } from '../helpers/createElement';
import { loadBackground } from '../helpers/loadBackground';

require.context('../images', true, /\.(png|jpg)$/);

export class Card {
  constructor(title) {
    this.imageCategorySource = `./images/categories/${title.toLowerCase()}.png`;
    this.text = title;
    this.el = null;
  }

  async render(imageSource) {
    const imgSrc = imageSource || this.imageCategorySource;
    const image = createElement('div', ['card__image'], undefined, undefined, [{ name: 'backgroundImage', value: `url("${imgSrc}")` }]);
    try {
      await loadBackground(imgSrc);
    } catch (err) {
      throw new Error('Error creating card');
    }
    this.el = createElement('div', ['card', 'card_category'], undefined, [
      createElement('div', ['card__inner'], undefined, [
        createElement('div', ['card__face', 'card__face_front'], undefined, [
          image,
          createElement('div', ['card__info'], undefined, [
            createElement('div', ['card__text'], undefined, [this.text]),
          ]),
        ]),
      ]),
    ]);
    return this.el;
  }
}
