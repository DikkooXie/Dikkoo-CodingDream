import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// 接管 root 节点
const root = ReactDOM.createRoot(document.getElementById('root'));

/**
 * React.createElement() 语法
 * 缺点：代码可读性差，不易维护，不易扩展
 */
// const element = React.createElement(
//   'div', {className: 'container'}, 
//   React.createElement('header', {className: 'header'}, 'Hello React'),
//   React.createElement('main', {className: 'content'},
//     React.createElement('aside', {className: 'sidebar'}, 'sidebar'),
//     React.createElement('section', {className: 'section'}, 'section'),
//     React.createElement('article', {className: 'article'}, 'article')
//   ),
//   React.createElement('footer', {className: 'footer'}, 'Goodby React')
// );

/**
 * JSX 语法
 * 表现力优于Vue
 * React Element VDOM(虚拟DOM)，全新打造的react节点，不是DOM Element。
 */
// const element = (
//   <div className='container'>
//     <header>Hello React!</header>
//     <main>
//       <aside>sidebar</aside>
//       <section>section</section>
//       <article>article</article>
//     </main>
//     <footer>Goodby React!</footer>
//   </div>
// );

// root.render(element);

/**
 * 使用组件
 */
root.render(<App />);