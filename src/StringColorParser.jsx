import React, {Component} from 'react';
import {number, string, arrayOf, shape, bool} from 'prop-types';

class StringColorParser extends Component {

  static getRegExp(props) {
    const {searchWords} = props;
    if (!(searchWords instanceof Array)) {
      throw new Error('Search Words should be an Array type!!!');
    }
    const string = searchWords.reduce((result, current) => result.concat(`${current}|`), '');
    return new RegExp(string, 'g');
  }

  constructor(props) {
    super(props);

    this.highlights = null;
    this.textarea = null;

    this.handleInput = this.handleInput.bind(this);
    this.handleScroll = this.handleScroll.bind(this);

    this.searchWordsRegExp = StringColorParser.getRegExp(props) || '';
  }

  componentDidUpdate(prevProps) {
    if(prevProps.searchWords !== this.props.searchWords) {
      this.searchWordsRegExp = StringColorParser.getRegExp(this.props);
      this.handleInput(this.textarea.value);
    }
  }

  handleInput(value) {
    this.highlights.innerHTML = this.parseString(value);
  }

  handleScroll() {
    this.highlights.scrollTop = this.textarea.scrollTop;
    this.highlights.scrollLeft = this.textarea.scrollLeft;
  }

  getOpeningTag(tag, depth) {
    const {colors = [], defaultColor, solidHighlight} = this.props;
    const color = colors[depth - 1] || defaultColor;
    const style = solidHighlight ? `background-color:${color};` : `color:${color};`;
    return `<${tag} style="${style}">`;
  }

  parseString(input) {
    const {delimiters, tag, searchWords} = this.props;
    const stack = [];
    let string = '';
    let depth = 0;
    if (delimiters && !searchWords) {
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
    } else if (searchWords && !delimiters) {
      return input.replace(/\n$/g, '\n\n').replace(this.searchWordsRegExp, `${this.getOpeningTag(tag, 1)}$&</${tag}>`);
    }
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
          onChange={({target: {value}}) => this.handleInput(value)}
          onScroll={this.handleScroll}
        />
      </div>
    );
  }
}

StringColorParser.propTypes = {
  tag: string,
  solidHighlight: bool,
  defaultColor: string,
  fontSize: number,
  colors: arrayOf(string),
  searchWords: arrayOf(string),
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
  defaultColor: 'lightsalmon',
  solidHighlight: false
};

export default StringColorParser;
