import 'babel-polyfill';
import {render} from 'react-dom';
import React from 'react';
import ParseInput from './src/StringColorParser';
import './src/styles.css';

render(
  <ParseInput
    colors={['skyblue', 'tomato', 'yellowgreen', 'orange']}
  />,
  document.getElementById('application-root')
);
