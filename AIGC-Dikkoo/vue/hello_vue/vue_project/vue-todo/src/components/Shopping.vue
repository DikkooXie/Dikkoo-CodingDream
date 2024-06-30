<template>
    <div class="container">
    <table>
        <thead>
            <th>序号</th>
            <th>书籍名称</th>
            <th>出版日期</th>
            <th>单价</th>
            <th>购买数量</th>
            <th>小计</th>
            <th>操作</th>
        </thead>
        <tbody>
            <!-- 商品列表 -->
            <tr v-for="(item, index) in books" :key="item.id">
                <td>{{index+1}}</td>
                <td>{{item.name}}</td>
                <td>{{item.date}}</td>
                <td>{{item.price}}</td>
                <td>
                <button class="count_btn" @click="minus(index)" :disabled="item.count <= 1">-</button>
                <input type="text" class="counter" v-model="item.count">
                <button class="count_btn" @click="add(index)">+</button>
                </td>
                <td>{{item.price * item.count}}</td>
                <td>
                <button class="remove_btn" @click="remove(index)">删除</button>
                </td>
            </tr>
            <!-- 合计 -->
            <tr>
                <td colspan="5" class="table_total">合计: </td>
                <td colspan="2" class="total_count">{{total}}</td>
            </tr>
        </tbody>
    </table>
    </div> 
</template>

<script setup>
import { ref, reactive, computed } from 'vue'

let books = reactive([
    {
        id: 1,
        name: '《算法导论》',
        date: '2006-9',
        price: 85.00,
        count: 1
    },
    {
        id: 2,
        name: '《UNIX编程艺术》',
        date: '2006-2',
        price: 59.00,
        count: 1
    },
    {
        id: 3,
        name: '《编程珠玑》',
        date: '2008-10',
        price: 39.00,
        count: 1
    },
    {
        id: 4,
        name: '《代码大全》',
        date: '2006-3',
        price: 128.00,
        count: 1
    }
]);

const add = (index) => {
    books[index].count++;
}

const minus = (index) => {
    if (books[index].count > 1) {
        books[index].count--;
    }
}

const remove = (index) => {
    books.splice(index, 1);
}

const total = computed(() => {
    // reduce() 方法对数组中的每个元素执行一个由您提供的函数(升序执行)，将其结果汇总为单个返回值。
    return books.reduce((pre, cur) => {
        return pre + cur.price * cur.count;
    }, 0);
})
</script>

<style lang="css" scoped>
.container {
    margin: 20px auto;
    width: 70%;
    display: flex;
    justify-content: center;
    align-items: center;
}
table {
    width: 100%;
    border-collapse: collapse;
}
th, td {
    border: 1px solid #aaa;
    padding: 5px;
    text-align: center;
}
.counter {
    margin: 0 5px;
    text-align: center;
    display: inline-block;
    width: 30px;
    height: 30px;
    line-height: 30px;
    border: 1px solid #aaa;
    border-radius: 5px;
}
.count_btn {
    color: #fff;
    background-color: #409eff;
    border: none;
    padding: 5px 10px;
    border-radius: 5px;
}
.count_btn:disabled {
    background-color: #dcdfe6;
}
.remove_btn {
    color: #fff;
    background-color: red;
    border: none;
    padding: 5px 10px;
    border-radius: 5px;
}
.table_total {
    text-align: right;
    background-color: #f5f5f5;
    font-weight: bold;
}
.total_count {
    background-color: #f5f5f5;
    font-weight: bold;
    color: red;
}
</style>