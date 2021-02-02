import { createElement } from '../helpers/createElement';
import { Card } from './Card';

export class CategoriesScreen {
  constructor(main, data) {
    this.main = main;
    this.data = data;
  }

  async render(renderCategory) {
    this.main.innerHTML = '';
    const allCat = this.data.categories;
    const catWRap = createElement('div', ['categories'], this.main);
    await Promise.all(allCat.map(async (item) => {
      const catObject = new Card(item);
      const cat = await catObject.render();
      catWRap.appendChild(cat);
      cat.addEventListener('click', () => renderCategory(item));
    }));
    const event = new Event('renderfirstscreen');
    document.dispatchEvent(event);
  }
}
