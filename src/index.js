console.log('hello world')
const React = {
  createElement(...args) {
    console.log(args)
  }
}

function dom(...args) {
  console.log('dom', args)
}

let div = <div>hello </div>;

let name = '饥人谷';
let element = <h1>hello {{name}}</h1>
