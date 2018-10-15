import 'babel-polyfill';
import {render} from 'react-dom';
import React from 'react';
import Parser from './src/StringColorParser';
import './styles.less';

render(
  <Parser
    tag="span"
    delimiters={[{start: '${', end: '}'}, {start: '--[', end: ']--'}]}
    colors={['green', 'red', 'blue', 'purple']}
    fontSize={20}
    defaultColor="black"
  />,
  document.getElementById('application-root')
);
