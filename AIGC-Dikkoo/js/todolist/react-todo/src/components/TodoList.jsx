import { Component } from 'react';
import TodoItem from './TodoItem';
import './TodoList.css';

class TodoList extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { todos } = this.props;
        return (
            <ul className='todo-list'>
                {/* 循环输出 */}
                {todos.map((todo, index) => (
                    <TodoItem 
                        key={index}
                        todo={todo}
                    />
                ))}
            </ul>
        )
    }
}

export default TodoList;