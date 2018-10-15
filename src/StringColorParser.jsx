import React, {Component} from 'react';
import {number, string, arrayOf, shape} from 'prop-types';

class StringColorParser extends Component {

  constructor(props) {
    super(props);

    this.highlights = null;
    this.textarea = null;

    this.handleInput = this.handleInput.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
  }

  handleInput({target: {value}}) {
    this.highlights.innerHTML = this.parseString(value);
  }

  handleScroll() {
    this.highlights.scrollTop = this.textarea.scrollTop;
    this.highlights.scrollLeft = this.textarea.scrollLeft;
  }

  getOpeningTag(tag, depth) {
    const {colors, defaultColor} = this.props;
    const color = colors[depth - 1] || defaultColor;
    return `<${tag} style="color:${color}">`;
  }

  parseString(input) {
    const {delimiters, tag} = this.props;
    const stack = [];
    let string = '';
    let depth = 0;
    for (let i = 0; i < input.length;) {
      const startDelimitersPair = delimiters.find(({start}) => input.substr(i, start.length) === start);
      const endDelimitersPair = delimiters.find(({end}) => input.substr(i, end.length) === end);
      if (endDelimitersPair && depth > 0) {
        if (stack[stack.length - 1] === endDelimitersPair.start) {
          depth -= 1;
          stack.pop();
          string += `</${tag}>${endDelimitersPair.end}`;
        } else {
          string += endDelimitersPair.end;
        }
        i += endDelimitersPair.end.length;
      } else if (startDelimitersPair) {
        depth += 1;
        stack.push(startDelimitersPair.start);
        string += `${startDelimitersPair.start}${this.getOpeningTag(tag, depth)}`;
        i += startDelimitersPair.start.length;
      } else {
        string += input.charAt(i);
        i += 1;
      }
    }
    return string;
  }

  render() {
    const {fontSize} = this.props;
    return (
      <div className="parse-string-container">
        <div
          ref={hl => this.highlights = hl}
          style={{fontSize}}
          className="highlights"
        />
        <textarea
          ref={ta => this.textarea = ta}
          style={{fontSize}}
          onChange={this.handleInput}
          onScroll={this.handleScroll}
        />
      </div>
    );
  }
}

StringColorParser.propTypes = {
  tag: string,
  defaultColor: string,
  fontSize: number,
  colors: arrayOf(string),
  delimiters: arrayOf(shape(
    {
      end: string.isRequired,
      start: string.isRequired
    }
  ))
};

StringColorParser.defaultProps = {
  tag: 'span',
  fontSize: 16,
  defaultColor: 'black',
  colors: ['green', 'blue', 'red', 'purple', 'yellow'],
  delimiters: [{start: '(', end: ')'}, {start: '[', end: ']'}, {start: '{', end: '}'}]
};

export default StringColorParser;
