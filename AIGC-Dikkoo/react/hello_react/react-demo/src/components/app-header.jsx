import { Component } from 'react';

// 类组件
// es6 Component基类 继承
class AppHeader extends Component {
    // 构造函数
    constructor(props) {
        // 调用父类的构造函数
        super(props);
        // state：状态，类似于vue的data，用于存储组件内部的数据
        this.state = {
            emoji: '😭'
        };
    }

    componentDidMount() { // 组件挂载完成后执行
        setInterval(() => this.changeEmoji(), 1000);
    }

    componentDidUpdate() { // 组件更新后执行
        console.log('componentDidUpdate');
    }

    // 自定义方法
    changeEmoji = () => {
        // Component类内置的setState方法，用于更新state
        this.setState({
            emoji: this.state.emoji === '😭' ? '😎' : '😭'
        });
    }

    // 类里的abstract方法，必须实现的方法
    // render方法
    render() {
        const { name } = this.props;
        const { emoji } = this.state;
        return (
        <div className='app-header'>
            <h1 className='title'>{name} is {emoji} now</h1>
        </div>
        );
    }
}

// 导出组件
export default AppHeader;