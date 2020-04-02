console.log('hello world')
const React = {
  createElement(...args) {
    console.log(args)
  }
}

function dom(...args) {
  console.log('dom', args)
}

let a = <div>hello </div>;
