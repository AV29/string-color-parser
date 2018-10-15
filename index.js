import 'babel-polyfill';
import {render} from 'react-dom';
import React from 'react';
import ParseInput from './src/StringColorParser';
import './styles.less';

render(
  <ParseInput
    colors={['skyblue', 'tomato', 'yellowgreen', 'orange']}
  />,
  document.getElementById('application-root')
);
