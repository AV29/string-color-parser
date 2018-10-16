import 'babel-polyfill';
import {render} from 'react-dom';
import React from 'react';
import Parser from './src/StringColorParser';
import './styles.less';


class X extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: ''
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange({target: {value}}) {
    this.setState({value});
  }

  render() {
    return (
      <div style={{height: 300}}>
        <input
          type="text"
          onChange={this.onChange}
          style={{marginBottom: 10}}
        />
        <Parser
          searchWords={[this.state.value]}
          fontSize={16}
          solidHighlight
        />
      </div>
    );
  }
}

render(<X/>, document.getElementById('application-root'));
