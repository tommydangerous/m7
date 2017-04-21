import { render } from 'react-dom';
import PropTypes from 'prop-types';
import React from 'react'

import './main.scss';

import Root from '../../containers/Root';

document.addEventListener('DOMContentLoaded', () => {
  render(
    <Root />,
    document.getElementById('app'),
  );
});
