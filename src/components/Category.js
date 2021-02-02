import { createElement } from '../helpers/createElement';
import { WordCard } from './WordCard';

export class Category {
  constructor(main, data, soundPlay, mode) {
    this.main = main;
    this.data = data;
    this.gameMode = mode;
    this.soundPlay = soundPlay;
  }

  async render(cat) {
    this.main.innerHTML = '';
    const catBlock = createElement('div', ['category'], this.main);
    const cardsData = Object.values(this.data.gameData[cat]);
    await Promise.all(cardsData.map(async (item) => {
      const wordCategory = cat !== 'difficult' ? cat : item.category;
      const cardObject = new WordCard(
        item.word, item, this.gameMode, this.soundPlay, wordCategory,
      );
      const card = await cardObject.render();
      catBlock.appendChild(card);
    }));
    const renderCategoryEvent = new CustomEvent('rendercategory', {
      detail: cat,
    });
    document.dispatchEvent(renderCategoryEvent);
  }
}
