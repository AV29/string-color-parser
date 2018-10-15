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
    const {opening, closing, colorMap} = this.props;
    const startIndexes = {};
    let string = '';
    let depth = 0;
    for (let i = 0; i < input.length; i += 1) {
      const currentChar = input.charAt(i);
      if (currentChar === closing && depth > 0) {
        depth -= 1;
        string += `</span>${currentChar}`;
      } else if (currentChar === opening) {
        depth += 1;
        startIndexes[depth] = i;
        string += `${currentChar}<span style="color:${colorMap[depth - 1] || this.DEFAULT_COLOR}">`;
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
