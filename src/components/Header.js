import { createElement } from '../helpers/createElement';

const imgSrc = require('../images/logo.png').default;

let instance = null;

export class Header {
  constructor(mode, root) {
    if (instance) {
      return instance;
    }
    this.mode = mode;
    this.root = root;
    instance = this;
  }

  render() {
    this.element = createElement('header', ['header'], this.root);
    this.menuToggle = createElement('button', ['menu-toggle'], this.element, [
      createElement('span', ['menu-toggle__dash']),
      createElement('span', ['menu-toggle__dash'], undefined, ['Menu']),
      createElement('span', ['menu-toggle__dash']),
    ]);
    this.logoWrap = createElement('h1', ['header__logo'], this.element, ['Engligatorrr!']);
    createElement('img', ['header__logo__image'], this.logoWrap, undefined, undefined, [{ name: 'src', value: imgSrc }, { name: 'alt', value: 'Aligator' }]);
    const rightBtns = createElement('div', ['buttons-wrap'], this.element);
    this.statsBtn = createElement('button', ['button', 'button-stats'], rightBtns, ['Stats']);
    this.checkbox = createElement('input', ['switch__checkbox'], undefined, undefined, [], [{ name: 'type', value: 'checkbox' }]);
    createElement('label', ['switch'], rightBtns, [
      this.checkbox,
      createElement('span', ['switch__inner'], undefined, undefined, undefined, [{ name: 'data-on', value: 'Play' }, { name: 'data-off', value: 'Train' }]),
      createElement('span', ['switch__slider']),
    ]);
    this.listen();
  }

  listen() {
    this.menuToggle.addEventListener('click', () => document.body.classList.toggle('menu-open'));
    this.logoWrap.addEventListener('click', () => {
      const event = new Event('openfirstscreen');
      document.dispatchEvent(event);
    });
    this.checkbox.addEventListener('change', () => {
      const modeSwitchEvent = new CustomEvent('gamemodecallswtich', { detail: this.checkbox.checked });
      document.dispatchEvent(modeSwitchEvent);
    });
    this.statsBtn.addEventListener('click', () => document.dispatchEvent(new Event('openstats')));
  }
}
