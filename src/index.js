
const React = {
  createElement(tag, attrs, ...children) {
    return {
      tag,
      attrs, 
      children
    }
  }
};

const ReactDom = {
  render(vdom, container) {
    container.innerHTML = '';
    render(vdom, container);
  }
};

function render(vdom, container) {
  let node;
  if(typeof vdom === 'string') {
    node = document.createTextNode(vdom);
  }

  if(typeof vdom === 'object') {
    node = document.createElement(vdom.tag);
    setAttribute(node, vdom.attrs);
    vdom.children.forEach(childVdom => render(childVdom, node));
  }

  container.appendChild(node);
}

function setAttribute(node, attrs) {
  if(!attrs) return;

  for(let key in attrs) {
    if(key.startsWith('on')) {
      node[key.toLocaleLowerCase()] = attrs[key];
    } else if(key === 'style') {
      Object.assign(node.style, attrs[key]);
    } else {
      node[key] = attrs[key];
    }
  }
}

let str = 'jirengu';
let styleObj = {
  color: 'red',
  fontSize: '30px'
};

ReactDom.render((
  <div className="wrap">
    Hello {str} 
    <button className="btn" onClick={()=> console.log('click me')}> Click me!</button>
    <p style={styleObj}>I have style</p>
  </div>
  ), document.body);
