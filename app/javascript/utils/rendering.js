import { render } from 'react-dom';
import React from 'react'

import BaseContainer from '../containers/BaseContainer';

export function renderApp(app, elementId='app') {
  document.addEventListener('DOMContentLoaded', () => {
    render(app, document.getElementById(elementId));
  });
}

export function renderAppInContainer(app, elementId='app') {
  document.addEventListener('DOMContentLoaded', () => {
    const element = document.getElementById(elementId);
    const elementAttributes = element.attributes;
    const props = {};
    Object.keys(elementAttributes).forEach(key => {
      const obj = elementAttributes[key];
      if (!!obj.name.match(/data-/)) {
        props[obj.name.replace('data-', '')] = obj.value;
      }
    });

    render(<BaseContainer app={React.cloneElement(app, props)} />, element);
  });
}
