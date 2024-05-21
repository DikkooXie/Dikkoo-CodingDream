// 用户每次创建一个todo，就存进数组
// 循环数组，生成数组长度相同的li结构

var todoList = [];
addTodo = document.querySelector('.btn');

// 新增按钮函数
function addNewTodo() {
    // 获取输入框的值
    var todo = document.getElementById('newTodo').value;
    // 如果输入框的值不为空
    if (todo !== '') {
        // 将输入框的值存进数组
        todoList.push({
            id: Date.now(),
            content: todo,
            done: false
        });
        // 渲染todoList
        renderTodoList();
        // 清空输入框
        document.getElementById('newTodo').value = '';
    }
}

// 渲染todoList函数
function renderTodoList() {
    
    var str = '';

    // 循环todoList数组
    todoList.forEach(function (todo) {
        str += `
            <li class="list-item">
                <input type="checkbox" class="item-check" id="newTodo">
                <p class="item-content">${todo.content}</p>
                <span class="close" data-id="${todo.id}" data-action="remove">×</span>
            </li>
        `;
    }
    );

    // 将str插入到ul中
    document.querySelector('.list').innerHTML = str;
}

// 删除按钮函数
function removeTodo(e) {
    if(e.target.dataset.action == 'remove') {
        // 获取当前点击的元素的id
        var id = e.target.dataset.id;
        // 通过id找到对应的todo
        var index = todoList.findIndex(function (todo) {
            return todo.id == id;
        });
        // 从数组中删除对应的todo
        todoList.splice(index, 1);
        // 重新渲染todoList
        renderTodoList();
    }
}

// 点击事件触发
addTodo.addEventListener('click', addNewTodo);
todoList.addEventListener('click', removeTodo);