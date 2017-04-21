import { render } from 'react-dom';
import React from 'react'

import BaseContainer from '../containers/BaseContainer';

export function renderApp(app, elementId='app') {
  document.addEventListener('DOMContentLoaded', () => {
    render(app, document.getElementById(elementId));
  });
}

export function renderAppInContainer(app, elementId='app') {
  renderApp(<BaseContainer app={app} />, elementId);
}
