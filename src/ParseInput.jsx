import React, {Component} from 'react';
import {number, string, arrayOf} from 'prop-types';
import './parse-input-styles.css';

class ParseInput extends Component {

  constructor(props) {
    super(props);

    this.highlights = null;
    this.textarea = null;

    this.DEFAULT_COLOR = 'black';

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

  parseString(input) {
    const {colorMap} = this.props;
    const bracketsConfig = [{open: '${', close: '}'}, {open: '$[', close: ']'}];
    const bracketsStack = [];
    let string = '';
    let depth = 0;
    for (let i = 0; i < input.length; i += 1) {
      const currentChar = input.charAt(i);
      const openingBracket = bracketsConfig.find(conf => input.substr(i, conf.open.length) === conf.open);
      const closingBracket = bracketsConfig.find(conf => input.substr(i, conf.close.length) === conf.close);

      if (closingBracket && depth > 0) {
        const targetBracket = bracketsConfig.find(conf => conf.close === closingBracket.close).open;
        const isRightBracket = bracketsStack[bracketsStack.length - 1].open === targetBracket;
        if (isRightBracket) {
          depth -= 1;
          string += `</span>${closingBracket.close}`;
          bracketsStack.pop();
        } else {
          string += closingBracket.close;
        }
        i += closingBracket.close.length - 1;
      } else if (openingBracket) {
        depth += 1;
        bracketsStack.push({open: openingBracket.open});
        string += `${openingBracket.open}<span style="color:${colorMap[depth - 1] || this.DEFAULT_COLOR}">`;
        i += openingBracket.open.length - 1;
      } else {
        string += currentChar;
      }
    }
    return string;
  }

  render() {
    const {width, height, fontSize} = this.props;
    return (
      <div
        className="parse-string-container"
        style={{width, height}}
      >
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

ParseInput.propTypes = {
  width: number,
  height: number,
  fontSize: number,
  closing: string,
  opening: string,
  colorMap: arrayOf(string)
};

ParseInput.defaultProps = {
  width: 460,
  height: 180,
  fontSize: 16,
  closing: '}',
  opening: '{',
  colorMap: ['green', 'blue', 'red', 'purple', 'yellow']
};

export default ParseInput;
