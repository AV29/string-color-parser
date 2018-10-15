# React String Color Parser

## Pretty narrow use cases :) 

* ##### npm install react-string-color-parser

### Usage example
 ```
 import Parser from 'react-string-color-parser';
 ...
 
 <Parser
    tag="span"
    delimiters={[{start: '${', end: '}'}, {start: '--[', end: ']--'}]}
    colors={['green', 'red', 'blue', 'purple']}
    fontSize={20}
    defaultColor="black"
 />
 ```
 
 # Props  
 
 * **tag** - HTML tag to wrap string pieces. Default - 'span'
 
 * **delimiters** - an array of delimiters for parser to respect when dividing a string. Default - ``[{start: '(', end: ')'}, {start: '[', end: ']'}, {start: '{', end: '}'}]``
  
 * **colors** - an array of color representations for nested string parts. Default - ``['green', 'blue', 'red', 'purple', 'yellow']``
  
 * **fontSize** - custom font size for input component. Default - 16px
  
 * **defaultColor** - a color for nesting depth that out of range due to size of colors array. Default - 'black' 
 
