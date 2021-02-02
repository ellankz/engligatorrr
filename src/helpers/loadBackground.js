import { createElement } from './createElement';

export const loadBackground = (src) => new Promise((resolve, reject) => {
  const image = createElement('img');
  image.addEventListener('load', () => resolve());
  image.addEventListener('error', (err) => reject(err));
  image.src = src;
});
