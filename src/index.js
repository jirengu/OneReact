console.log('hello world');
const React = {
  createElement(tag, attrs, ...children) {
    return {
      tag,
      attrs, 
      children
    }
  }
};



let str = 'jirengu';
let styleObj = {
  color: 'red',
  fontSize: '30px'
}

let vdom = (
  <div className="wrap">
    Hello {str} 
    <button className="btn" onClick={()=> console.log('click me')}> Click me!</button>
    <p style={styleObj}>I have style</p>
  </div>
  );
console.log(vdom);

// babel 测试
//https://babeljs.io/repl#?browsers=&build=&builtIns=false&spec=false&loose=false&code_lz=DYUwLgBAbgJg9gWwgXggCgFAQgHhgSyggGNgBDAZwoDkyERkAiAdwCcyAHRgPi2wgASIYMDgQA3hTCsAvhD7YcAIwCuYMHAB2JclVr0mSsJsYQtAYWD5iAa2Ti0ASmTcSWinFAA6UQHM0AOSk1jYQ9AGOMq6WIWEgAIQ4APSq6lq8_LgcEFIAnqD2eaAA8koAVlEAkhAAFmRQIDlg-SDJHBm4SQRQHY4A3BjE7p4gPnD-sIj9QA&debug=false&forceAllTransforms=false&shippedProposals=false&circleciRepo=&evaluate=false&fileSize=false&timeTravel=false&sourceType=module&lineWrap=false&presets=&prettier=false&targets=&version=7.9.0&externalPlugins=%40babel%2Fplugin-transform-react-jsx%407.9.4