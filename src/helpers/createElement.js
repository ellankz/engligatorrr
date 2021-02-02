export const createElement = (selector, classes, parent, children, styles, attributes) => {
  const elem = document.createElement(selector);
  if (classes) {
    classes.forEach((oneClass) => {
      elem.classList.add(oneClass);
    });
  }
  if (parent) {
    parent.appendChild(elem);
  }

  if (children) {
    children.forEach((child) => {
      if (typeof child === 'string') {
        elem.textContent += child;
      } else {
        elem.appendChild(child);
      }
    });
  }

  if (styles) {
    styles.forEach((style) => {
      elem.style[style.name] = style.value;
    });
  }

  if (attributes) {
    attributes.forEach((attr) => {
      elem.setAttribute(attr.name, String(attr.value));
    });
  }

  return elem;
};
