import ReactDOM from './react-dom.js';

window.Components = []
class Component {
  constructor(props) {
    this.props = props;
    this.state = {};
    Components.push(this);
  }

  setState(state) {
    Object.assign(this.state, state);
    ReactDOM.renderComponent(this);
  }
};


const React = {
  createElement(tag, attrs, ...children) {
    return {
      tag,
      attrs, 
      children
    }
  },

  Component
};

export default React;