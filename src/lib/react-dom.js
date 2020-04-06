function render(vdom, container) {
  let dom = createDomFromVdom(vdom);
  container.appendChild(dom);
}

function createDomFromVdom(vdom) {
  let dom;
  if(typeof vdom === 'string') {
    dom = document.createTextNode(vdom);
  }

  if(typeof vdom === 'object') {
    if(typeof vdom.tag === 'function') {
      let component = new vdom.tag(vdom.attrs);
      let componentVdom = component.render();
      dom = createDomFromVdom(componentVdom); 
      component.$root = dom; 
    } else {
      dom = document.createElement(vdom.tag);
      setAttribute(dom, vdom.attrs);
      vdom.children.forEach(childVdom => render(childVdom, dom));
    }

  }
  return dom
}

function renderComponent(component) {
  let componentVdom = component.render();
  let dom = createDomFromVdom(componentVdom);

  if(component.$root && component.$root.parentNode) {
    component.$root.parentNode.replaceChild(dom, component.$root);
  }
  component.$root = dom;  
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
  },
  renderComponent
};

export default ReactDom;
