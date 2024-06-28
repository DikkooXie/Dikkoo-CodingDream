// 根组件
// 使用函数创建组件，一定返回JSX元素
// 组件不同于html（一堆html+css+js）
// 页面由组件组成，更利于复用
import AppHeader from './components/app-header';

const App = () => {
    const element = (
        <div className = "container">
            <AppHeader name="吴彦祖" />
            <AppHeader name="彭于晏" />
            <h1 className="title">123</h1>
        </div>
    )
    return element;
}

// module输出，供其他模块使用
export default App;