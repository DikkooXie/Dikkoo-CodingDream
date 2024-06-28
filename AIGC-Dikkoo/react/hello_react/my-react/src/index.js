// es6 module
import ReactDOM from 'react-dom/client';
import React from 'react';
// 组件导入
import App from './app/app.jsx';

// 1. 通过createRoot创建一个Root对象
const root = ReactDOM.createRoot(
  // 获取挂载点，以后react就不再做dom操作了
  document.getElementById('root')
);

// 2. 通过Root对象的render方法渲染组件

// 2.1 JSX **首选**
// JSX 是一种 JavaScript 语法扩展。它可以让我们在 JavaScript 代码中编写类似 HTML 的代码。
root.render(<h1>Hello, React!</h1>);

// 2.2 createElement()
// 创建一个 React 元素，它可以作为 JSX 的替代方案。
const element = React.createElement('h1', null, 'Hello, React!');
root.render(element);

// 3. 叠加渲染

const element2 = React.createElement('h2', {id: 'name'}, 'Hello, React2!');
root.render(element2);

// 4. 渲染组件
root.render(<App />);
