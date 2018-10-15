import 'babel-polyfill';
import {render} from 'react-dom';
import React from 'react';
import ParseInput from './src/ParseInput';

render(
  <ParseInput/>,
  document.getElementById('application-root')
);
