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

const ReactDom = {
  render(vdom, container) {
    container.innerHTML = '';
    render(vdom, container);
  }
};

export default ReactDom;
