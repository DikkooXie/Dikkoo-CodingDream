// 用户每次创建一个todo，就存进数组
// 循环数组，生成数组长度相同的li结构

var todoData = []
var addTodo = document.querySelector('.btn')
var todoList = document.querySelector('.list')

// 新增按钮
function addNewTodo() {
  // input 是否有值
  if (document.getElementById('newTodo').value !== '') {
    todoData.push({
      id: Date.now(),
      content: document.getElementById('newTodo').value,
      completed: false
    })

    // 渲染列表
    render()
    document.getElementById('newTodo').value = ''
  }
}

function render() {
  var str = ''

  for (var i = 0; i < todoData.length; i++) {
    // todoData[i]   str = str + 1  ==> str += 1
    var item = todoData[i]

    str += `
      <li class="list-item">
        <input type="checkbox" class="item-check" id="">
        <p class="item-content">${item.content}</p>
        <span class="close" data-id="${item.id}" data-action="remove">✖️</span>
      </li>
    `
  }

  // 往ul中植入str
  todoList.innerHTML = str
}

function removeTodo(e) {
  console.log(e.target);
  if (e.target.dataset.action == "remove") {
    // 拿到当前这个span上的id值，找到数组中哪个对象中id和这个
    // span的id相等，找出它的下标
    // 按照下标移除数组中的元素
    
    render()
  }
}


addTodo.addEventListener('click', addNewTodo)
todoList.addEventListener('click', removeTodo)