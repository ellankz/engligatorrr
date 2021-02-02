import { createElement } from '../helpers/createElement';

export class GameControl {
  constructor(root) {
    this.root = root;
    this.el = null;
    this.state = undefined;
  }

  render() {
    this.el = createElement('div', ['control'], this.root);
    this.textSpan = createElement('span', ['control__button__text']);
    this.btn = createElement('button', ['button', 'control__button'], this.el, [
      createElement('div', ['control__button__icon']),
      this.textSpan,
    ], undefined, [
      { name: 'type', value: 'button' },
    ]);
    this.listen();
  }

  listen() {
    this.btn.addEventListener('click', () => {
      if (this.state === false) {
        const event = new Event('startgame');
        document.dispatchEvent(event);
      } else if (this.state === true) {
        const event = new Event('repeatsound');
        document.dispatchEvent(event);
      }
    });
  }

  update() {
    switch (this.state) {
      case undefined:
        this.btn.className = 'button control__button control__button_unavailable';
        this.textSpan.innerText = 'Choose Category';
        break;
      case false:
        this.btn.className = 'button control__button control__button_can-start';
        this.textSpan.innerText = 'Start';
        break;
      case true:
        this.btn.className = 'button control__button control__button_can-repeat';
        this.textSpan.innerText = 'Repeat';
        break;
      default:
        break;
    }
  }

  hide() {
    this.el.classList.remove('control_shown');
  }

  show() {
    this.el.classList.add('control_shown');
  }
}
