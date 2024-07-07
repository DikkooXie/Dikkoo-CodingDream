import { Component } from 'react';
import './TodoForm.css';

class TodoForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputText: ''
        }
    }

    handleInputChange = (e) => {
        this.setState({ 
            inputText: e.target.value 
        });
    }

    cleanInput = () => {
        this.setState({ inputText: '' });
    }

    handleSubmit = (e) => {
        e.preventDefault(); // 阻止表单提交的默认行为（刷新页面）
        if (this.state.inputText.trim()) { // 判断输入框是否有值，trim()方法用于去除字符串两端的空格
            this.props.addTodo(this.state.inputText); // 调用父组件传递过来的新增todo方法
            this.cleanInput(); // 清空输入框
        }
    }

    render() {
        let { inputText } = this.state;
        return (
            <form 
                className='todo-form' onSubmit={this.handleSubmit}
            >
                <input 
                    type='text' className='todo-form__input'
                    value={inputText}
                    onChange={this.handleInputChange}
                />
                <button
                    type='submit'
                    className='todo-form__button'
                />
            </form>
        )
    }
}

export default TodoForm;