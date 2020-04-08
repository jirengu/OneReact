import React from './react.js';

function renderVdom(vdom, container) {
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
      let component = createComponent(vdom.tag, vdom.attrs);
      let componentVdom = component.render();
      dom = createDomFromVdom(componentVdom); 
      component.$root = dom; 
    } else {
      dom = document.createElement(vdom.tag);
      setAttribute(dom, vdom.attrs);
      vdom.children.forEach(childVdom => renderVdom(childVdom, dom));
    }

  }
  return dom
}

function createComponent(constructor, attrs) {
  let component; 
  //如果是用class创建的
  if(constructor.prototype instanceof React.Component) {
    component = new constructor(attrs);
  } else {
    let Component = class extends React.Component {};
    Component.prototype.render = function() {
      return constructor.bind(this)(attrs);
    }
    component = new Component(attrs);   
  } 
  console.log(component);
  return component;
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


function render(vdom, container) {
  container.innerHTML = '';
  renderVdom(vdom, container);
}


export {
  render,
  renderComponent
};

export default {
  render,
  renderComponent
};
