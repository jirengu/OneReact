import React from './lib/react.js';
import ReactDOM from './lib/react-dom.js';

let str = 'jirengu';
let styleObj = {
  color: 'red',
  fontSize: '30px'
};

ReactDOM.render((
  <div className="wrap">
    Hello {str} 
    <button className="btn" onClick={()=> console.log('click me')}> Click me!</button>
    <p style={styleObj}>I have style</p>
  </div>
  ), document.body);
