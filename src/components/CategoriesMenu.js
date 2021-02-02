import { createElement } from '../helpers/createElement';

require.context('../icons', true, /\.(svg)$/);

let instance = null;
export class CategoriesMenu {
  constructor(categories, header) {
    if (instance) {
      return instance;
    }
    this.categories = categories;
    this.header = header;
    instance = this;
  }

  render() {
    const sidebar = createElement('aside', ['sidebar'], this.header.element, [
      this.menu = createElement('div', ['menu'], undefined, this.categories.map((cat) => {
        const icon = createElement('img', ['menu__item__icon'], undefined, undefined, undefined, [{ name: 'src', value: `./icons/${cat.toLowerCase()}.svg` }, { name: 'alt', value: cat }]);
        const link = createElement('a', ['menu__item__link'], undefined, [icon, createElement('span', ['menu__item__text'], undefined, [cat])], undefined, [{ name: 'href', value: `./${cat}` }]);
        const catItem = createElement('div', ['menu__item'], undefined, [link]);
        link.addEventListener('click', (event) => {
          event.preventDefault();
          const customEvent = new CustomEvent('opencategory', {
            detail: cat,
          });
          document.dispatchEvent(customEvent);
          document.body.classList.remove('menu-open');
        });
        return catItem;
      })),
    ]);

    const toggle = this.header.element.querySelector('.menu-toggle');

    document.addEventListener('click', (event) => {
      if (!sidebar.contains(event.target) && !toggle.contains(event.target)) {
        document.body.classList.remove('menu-open');
      }
    });

    return sidebar;
  }

  highLightCategory(cat) {
    const menuItems = this.menu.children;
    for (let i = 0; i < menuItems.length; i += 1) {
      if (menuItems[i].children[0].textContent === cat) {
        menuItems[i].classList.add('menu__item_active');
      } else {
        menuItems[i].classList.remove('menu__item_active');
      }
    }
  }

  disbaleCategoryHighlight() {
    this.highLightCategory('');
  }
}
