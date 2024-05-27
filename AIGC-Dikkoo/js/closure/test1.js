var arr = []

// for循环不产生作用域
for(var i = 0; i < 10; i++) {
  arr[i] = function() {
    console.log(i)
  }
}

// for循环执行完毕，i=10

arr.forEach(function(item) {
    item(); // console.log(i) => 10
})