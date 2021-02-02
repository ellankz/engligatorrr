import { createElement } from '../helpers/createElement';
import { CategoriesScreen } from './CategoriesScreen';
import { Category } from './Category';
import { GameEnd } from './GameEnd';
import { TextScreen } from './TextScreen';

export class Main {
  constructor(data, mode, root, soundPlay, stats) {
    this.data = data;
    this.gameMode = mode;
    this.root = root;
    this.soundPlay = soundPlay;
    this.stats = stats;
  }

  init() {
    this.main = createElement('main', ['main'], this.root);
    this.categoryScreen = new Category(this.main, this.data, this.soundPlay, this.gameMode);
    this.firstScreen = new CategoriesScreen(this.main, this.data);
    this.gameEnd = new GameEnd(this.main);
    this.textScreen = new TextScreen(this.main);
    return this;
  }

  fadeOutIn(cb, currentThis, ...args) {
    if (this.main.classList.contains('animating')) return;
    if (this.main.classList.contains('unclickable')) return;

    const allowClick = () => {
      this.main.classList.remove('animating');
    };

    const runCb = async () => {
      await cb.apply(currentThis, args);
      this.main.classList.remove('hidden');
      window.setTimeout(() => allowClick.bind(this)(), 200);
    };

    this.main.classList.add('hidden', 'animating');
    window.setTimeout(() => {
      runCb.bind(this)();
    }, 200);
  }

  render(cat) {
    if (cat) {
      this.renderCategory(cat);
    } else {
      this.renderFirstScreen();
    }
  }

  listen() {
    document.addEventListener('openstats', () => {
      this.renderStats();
    });
    document.addEventListener('opencategory', (event) => {
      this.renderCategory(event.detail);
    });
    document.addEventListener('openfirstscreen', () => {
      this.renderFirstScreen();
    });
    document.addEventListener('rendergameend', () => {
      this.main.classList.add('unclickable');
      window.setTimeout(() => {
        this.main.classList.remove('unclickable');
        this.renderFirstScreen();
      }, 4000);
    });
    document.addEventListener('gameend', (event) => {
      this.renderGameEnd(event.detail);
    });
    document.addEventListener('opentext', (event) => {
      this.renderTextScreen(event.detail);
    });
  }

  renderCategory(cat) {
    this.fadeOutIn(this.categoryScreen.render, this.categoryScreen, cat, this.gameMode);
  }

  renderFirstScreen() {
    this.fadeOutIn(this.firstScreen.render, this.firstScreen, this.renderCategory.bind(this));
  }

  renderGameEnd(score) {
    this.fadeOutIn(this.gameEnd.render, this.gameEnd, score);
  }

  renderStats() {
    this.fadeOutIn(this.stats.render, this.stats, this.main);
  }

  renderTextScreen(text) {
    this.fadeOutIn(this.textScreen.render, this.textScreen, text);
  }
}
