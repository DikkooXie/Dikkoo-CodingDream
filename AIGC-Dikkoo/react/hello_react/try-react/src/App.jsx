// 根组件：返回JSX的函数就是组件
import AppHeader from './components/app-header';

const App = () => {
  const name = "Dikkoo";

  return (
    <div className='container'>
      <AppHeader name={name}/>
      <main>
        <aside>sidebar</aside>
        <section>section</section>
        <article>article</article>
      </main>
      <footer>Goodby React!</footer>
    </div>
  )
}

export default App;