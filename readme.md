# React String Color Parser

## Pretty narrow use cases :) 

* npm install react-string-color-parser

### Usage example
 ```
 import Parser from 'react-string-color-parser';
 ...
 
 <Parser
    tag="span"
    fontSize={16}
    delimiters={[{start: '${', end: '}'}, {start: '--[', end: ']--'}]}
    colors={['yellowgreen', 'tomato', 'skyblue', 'papayawhip']}
    defaultColor="black"
 />
 ```
 
 Result 
 ![Alt text](./example.png "Title")
 
 
  ```
  import Parser from 'react-string-color-parser';
  ...
  
  <Parser
    colors={['yellowgreebn', 'tomato', 'skyblue', 'papayawhip']}
    solidHighlight
  />
  ```
  
  Result 
  ![Alt text](./exampleSolid.png "Title")
  
 
 **Props**  
 
 * **tag** - HTML tag to wrap string pieces. Default - 'span'
 
 * **delimiters** - an array of delimiters for parser to respect when dividing a string. Default - ``[{start: '(', end: ')'}, {start: '[', end: ']'}, {start: '{', end: '}'}]``
  
 * **colors** - an array of color representations for nested string parts. Default - ``['green', 'blue', 'red', 'purple', 'yellow']``
  
 * **fontSize** - custom font size for input component. Default - 16px
  
 * **defaultColor** - a color for nesting depth that out of range due to size of colors array. Default - 'black' 
 
