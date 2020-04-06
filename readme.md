# 如何设置React环境，Webpack和Babel
在本教程中，您将学习：

- 如何安装和配置Webpack
- 如何安装和配置Babel
- 如何搭建React环境
- 如何将结果包包含到HTML页面中
- 如何安装和配置Webpack开发服务器


## 设置项目
首先，为项目创建目录：

```
mkdir webpack-react-tutorial && cd webpack-react-tutorial
```
创建用于保存代码的最小目录结构：

```
mkdir -p src
```

通过运行以下内容来初始化项目：

```
npm init -y
```


## 设置Webpack

让我们通过运行以下命令安装webpack和webpack-cli：

```
npm i webpack webpack-cli --save-dev
```

现在在里面添加webpack命令package.json：

```
"scripts": {
  "build": "webpack --mode production"
}
```

此时，无需为webpack定义配置文件。较旧的webpack版本会自动查找配置文件。从版本4开始，情况不再如此。

## 设置 Babel 解释 JSX
React组件主要是用现代JavaScript语法编写的。以class关键字为例。有状态的React组件可以声明为类或箭头（或常规函数）。但是旧版浏览器无法理解ECMAScript 2015，因此我们需要某种转换。

这种转换称为转换。Webpack本身不知道如何转换JavaScript。相反，它依赖于loader作为转换工具。一个webpack loader 将某些东西作为输入并产生一个输出，称为bundle。

`babel-loader`是负责与Babel对话的 webpack loader。同时 Babel必须配置预设（preset，预先配置好的一组插件）：

- `@babel/preset-env` 用于将现代JavaScript编译为ES5
- `@babel/preset-react` 可将JSX和其他内容编译为JavaScript

安装依赖项：

```
npm i @babel/core babel-loader @babel/preset-env @babel/preset-react --save-dev
```

以上工具的作用是：webpack项目里当 import 一个`.jsx`文件时，使用 `babel-loader` 来处理这个文件， `babel-loader` 使用 `@babel/core` 来执行转换， 在转换的过程中使用了babel的 `@babel/preset-env`插件用于把最新的ES转换为ES5，使用 `@babel/preset-react`把 JSX转换为正常的JavaScript。

在项目根目录创建 .babelrc 文件，该文件的作用是 告诉 babel-core 在执行转换的时候使用如下插件：

```
{
  "presets": ["@babel/preset-env", "@babel/preset-react"]
}
```

或者

```
{
  "presets": [
    "@babel/preset-env"
  ],
  "plugins": [
    ["transform-react-jsx", {
        "pragma": "React.createElement"
    }]
  ]
}
```

创建一个名为的文件webpack.config.js，内容如下：

```
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    index: './src/index.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin()
  ],
  output: {
    filename: '[name].[hash:5].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist'
  }
}

```

该配置非常少。对于每个带有js或jsx扩展名的文件，Webpack都会通过babel-loader处理代码。
以上配置不只能用于本章练习JSX，也适合正式的React开发环境。

为了使环境能正常启动，需要安装 `html-webpack-plugin` 和 `wepack-dev-server`

```
npm i --save-dev html-webpack-plugin webpack-dev-server
```

修改 package.json

```
{
  ...
  "scripts": {
    "start": "webpack-dev-server",
    "build": "webpack"
  },
  ...
}
```

## 测试JSX

创建 `src/index.js` 文件

```
const React = {
  createElement(...args) {
    console.log(args)
  }
};

let div = <div>hello </div>;
console.log(div);

```

执行，启动测试

```
npm run start 
```

## 参考
- [babel-preset-react 文档](https://babeljs.io/docs/en/babel-preset-react)
- [bebal 演练场](https://babeljs.io/repl#?browsers=&build=&builtIns=false&spec=false&loose=false&code_lz=MYewdgzgLgBASgUwIbFgXhgbwFAxsAJ2SgQFEAbBAWwTCgAoA6ZpAgcwgEotc99wIISo3Ig29Vh068AvthkBubNkqwAJgEsAbjAwAeTVoB8ACwTlRMPQHpDRpaEhCEIsfUOcFQA&debug=false&forceAllTransforms=false&shippedProposals=false&circleciRepo=&evaluate=false&fileSize=false&timeTravel=false&sourceType=module&lineWrap=true&presets=react&prettier=false&targets=&version=7.9.0&externalPlugins=)