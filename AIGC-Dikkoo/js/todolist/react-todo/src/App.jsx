import { Component } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: [
        {
          task: 'Learn React',
          completed: false
        },
        {
          task: 'Learn Node.js',
          completed: false
        },
        {
          task: 'Learn Express',
          completed: false
        }
      ]
    };
  }

  addTodo = (task) => {
    this.setState({
      todos: [
        ...this.state.todos, // 展开运算符，它将原始数组中的所有元素添加到新数组中
        { // 添加一个新的任务对象
          task,
          completed: false
        }
      ]
    })
  }

  render() {
    const { todos } = this.state;

    return (
      <div className='todo-app'>
        <h1 className='todo-app__title'>Todo List</h1>
        <TodoForm addTodo={this.addTodo} />
        <TodoList 
          todos = {todos}
        />
      </div>
    );
  }
}

export default App;