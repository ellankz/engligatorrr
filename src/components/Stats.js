import 'bootstrap/scss/bootstrap.scss';
import { createElement } from '../helpers/createElement';
import { StatsCollection } from './StatsCollection';
import { StatsStorage } from './StatsStorage';

const sortSrc = require('../images/sort.svg').default;

const RESET_BUTTON_TEXT = 'Reset Stats';
const REPEAT_DIFFICULT_TEXT = 'Repeat Difficult';
const NO_DIFFICULT_WORDS_TEXT = 'There are no difficult words to repeat';

export class Stats {
  constructor(data, main) {
    this.main = main;
    this.data = data;
    this.currentSorting = {
      elementClassName: null,
      order: false,
    };
  }

  init() {
    this.storage = new StatsStorage(this.data);
    this.collection = new StatsCollection(this.storage);
    this.collection.init();
    return this;
  }

  render(main, statsToUpdate) {
    this.main = main;
    this.main.innerHTML = '';
    this.wrapper = createElement('div', ['stats'], this.main);
    this.buttonReset = createElement('button', ['button', 'button_reset'], this.wrapper, [RESET_BUTTON_TEXT], undefined, [
      { name: 'type', value: 'button' },
    ]);
    this.buttonDifficultRepeat = createElement('button', ['button', 'button_difficul'], this.wrapper, [REPEAT_DIFFICULT_TEXT], undefined, [
      { name: 'type', value: 'button' },
    ]);
    const stats = statsToUpdate || this.storage.getStats();
    const rows = Object.values(stats).map((item) => createElement('tr', [], undefined, [
      createElement('th', [], undefined, [item.word], undefined, [{ name: 'scope', value: 'row' }]),
      createElement('td', [], undefined, [item.category]),
      createElement('td', [], undefined, [item.train.toString()]),
      createElement('td', [], undefined, [item.correct.toString()]),
      createElement('td', [], undefined, [item.incorrect.toString()]),
      createElement('td', [], undefined, [item.percentCorrect.toString()]),
    ]));
    const sortAttributes = [{ name: 'src', value: sortSrc }, { name: 'alt', value: 'sort' }];
    this.sortIcons = {
      word: createElement('img', ['sort', 'word__sort'], undefined, undefined, undefined, sortAttributes),
      category: createElement('img', ['sort', 'category__sort'], undefined, undefined, undefined, sortAttributes),
      train: createElement('img', ['sort', 'train__sort'], undefined, undefined, undefined, sortAttributes),
      correct: createElement('img', ['sort', 'right__sort'], undefined, undefined, undefined, sortAttributes),
      incorrect: createElement('img', ['sort', 'wrong__sort'], undefined, undefined, undefined, sortAttributes),
      percentCorrect: createElement('img', ['sort', 'percent__sort'], undefined, undefined, undefined, sortAttributes),
    };
    createElement('div', ['table-responsive', 'table-wrap'], this.wrapper, [
      createElement('table', ['table', 'table-striped'], undefined, [
        createElement('thead', [], undefined, [
          createElement('th', [], undefined, [
            createElement('span', [], undefined, ['Word']),
            this.sortIcons.word,
          ], undefined, [{ name: 'scope', value: 'col' }]),
          createElement('th', [], undefined, [
            createElement('span', [], undefined, ['Category']),
            this.sortIcons.category,
          ], undefined, [{ name: 'scope', value: 'col' }]),
          createElement('th', [], undefined, [
            createElement('span', [], undefined, ['Train']),
            this.sortIcons.train,
          ], undefined, [{ name: 'scope', value: 'col' }]),
          createElement('th', [], undefined, [
            createElement('span', [], undefined, ['Right']),
            this.sortIcons.correct,
          ], undefined, [{ name: 'scope', value: 'col' }]),
          createElement('th', [], undefined, [
            createElement('span', [], undefined, ['Wrong']),
            this.sortIcons.incorrect,
          ], undefined, [{ name: 'scope', value: 'col' }]),
          createElement('th', [], undefined, [
            createElement('span', [], undefined, ['%']),
            this.sortIcons.percentCorrect,
          ], undefined, [{ name: 'scope', value: 'col' }]),
        ]),
        createElement('tbody', [], undefined, rows),
      ]),
    ]);
    this.listen();
    document.dispatchEvent(new Event('renderstats'));
  }

  listen() {
    Object.entries(this.sortIcons).forEach((icon) => {
      icon[1].addEventListener('click', (event) => {
        if (this.currentSorting.elementClassName === event.target.className) {
          this.currentSorting.order = !this.currentSorting.order;
          this.tableSort(icon[0], this.currentSorting.order);
        } else {
          this.currentSorting.elementClassName = event.target.className;
          this.currentSorting.order = true;
          this.tableSort(icon[0], true);
        }
      });
    });
    this.buttonReset.addEventListener('click', () => {
      this.storage.resetStats();
      this.render(this.main, this.storage.getStats());
    });

    this.buttonDifficultRepeat.addEventListener('click', () => {
      const stats = this.sortData('incorrect', true);
      const difficultWords = stats.slice(0, 8).filter((word) => word.incorrect > 0);
      if (difficultWords.length) {
        this.data.composeDifficult(difficultWords);
        const event = new CustomEvent('opencategory', { detail: 'difficult' });
        document.dispatchEvent(event);
      } else {
        const event = new CustomEvent('opentext', { detail: NO_DIFFICULT_WORDS_TEXT });
        document.dispatchEvent(event);
      }
    });
  }

  tableSort(parameter, shouldBeDirect) {
    const stats = this.sortData(parameter, shouldBeDirect);
    this.render(this.main, stats);
  }

  sortData(parameter, shouldBeDirect) {
    const orderChanger = shouldBeDirect ? 1 : -1;
    let stats = Object.values(this.storage.getStats());
    stats = stats.sort((a, b) => {
      if (a[parameter] > b[parameter]) {
        return -1 * orderChanger;
      }
      return 1 * orderChanger;
    });
    return stats;
  }
}
