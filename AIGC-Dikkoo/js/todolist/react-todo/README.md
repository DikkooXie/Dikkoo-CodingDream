# TodoList with React

## 数据管理

- 父子组件通信
    - 数据/方法交给父组件管理，通过props传递给子组件。
    - 子组件专心于渲染，不关心数据来源。

- 文本框输入
    - 双向绑定
        - input的值（value）由state控制
        - onChange事件触发更新state
        - 示例：
            ```jsx
            <input 
                type='text' className='todo-form__input'
                value={this.state.inputText}
                onChange={(e) => this.setState({inputText: e.target.value})}
            />
            ```
        - 与vue的区别：
            - vue：v-model
            - react：value + onChange
- 列表循环渲染
    - map
        - 通过map方法遍历数组，返回一个新数组，再将新数组渲染到页面上。
        - 列表元素
            - 需要key属性，用于React的diff算法，提高性能。
            - 
        - 示例：
            ```jsx
            <ul>
                {this.state.todos.map((todo, index) => (
                    /*
                    <li key={index}>
                        {todo}
                    </li>
                    */
                   
                ))}
            </ul>
            ```
    - 与vue的区别：
        - vue：v-for
        - react：map