import { createElement } from '../helpers/createElement';

const imgSrc = require('../images/rs-school-logo.svg').default;

const GITHUB_URL = 'https://github.com/ellankz/';
const GITHUB_NAME = 'ellankz';
const RSS_URL = 'https://rs.school/js/';
const RSS_TITLE = 'The Rolling Scopes School';

let instance = null;

export class Footer {
  constructor(root) {
    if (instance) {
      return instance;
    }
    this.element = createElement('footer', ['footer'], root);
    instance = this;
  }

  render() {
    createElement('div', ['footer__text'], this.element, [
      createElement('span', [], undefined, ['Made by ']),
      createElement('a', ['footer__github-link'], undefined, [GITHUB_NAME], [], [
        { name: 'href', value: GITHUB_URL },
        { name: 'target', value: '_blank' },
      ]),
      createElement('span', [], undefined, [' for ']),
      createElement('a', ['footer__rs-school-link'], undefined, [
        createElement('img', ['footer__rs-school-logo'], undefined, undefined, undefined, [
          { name: 'src', value: imgSrc },
          { name: 'alt', value: RSS_TITLE },
        ]),
      ], [], [
        { name: 'href', value: RSS_URL },
        { name: 'target', value: '_blank' },
      ]),
    ]);
  }
}
