import 'babel-polyfill';
import {render} from 'react-dom';
import React from 'react';
import Parser from './src/StringColorParser';
import './styles.less';

render(
  <Parser
    delimiters={[{start: '${', end: '}'}, {start: '--[', end: ']--'}]}
    fontSize={16}
    colors={['yellowgreen', 'tomato', 'skyblue', 'papayawhip']}
  />,
  document.getElementById('application-root')
);
