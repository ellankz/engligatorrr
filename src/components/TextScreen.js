import { createElement } from '../helpers/createElement';

export class TextScreen {
  constructor(main) {
    this.main = main;
  }

  render(text) {
    this.main.innerHTML = '';
    createElement('div', ['text-screen'], this.main, [text]);
  }
}
