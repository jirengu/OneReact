//import ReactDOM from './react-dom.js';
import { renderComponent } from './react-dom.js';

window.Components = []
class Component {
  constructor(props) {
    this.props = props;
    this.state = {};
    Components.push(this);
  }

  setState(state) {
    Object.assign(this.state, state);
    //ReactDOM.renderComponent(this);
    renderComponent(this);
  }
};


function createElement(tag, attrs, ...children) {
  return {
    tag,
    attrs, 
    children
  }
}

export {
  createElement,
  Component
};

export default {
  createElement,
  Component
};