<template>
<div class="login">
    <div class="login-wrap">
        <form>
            <div class="username flex">
                <label>账号：</label>
                <input v-model="data.username" type="text" />
            </div>
            <div class="password flex">
                <label>密码：</label>
                <input v-model="data.password" type="text">
            </div>

            <button class="btn" @click="login">登录</button>
        </form>
    </div>
</div>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

// 数据
const data = reactive({
    username: 'admin',
    password: '123'
})

// 路由
const router = useRouter()

// 逻辑代码
// 当用户名为admin，密码为123时，跳转到首页
const login = () => {
    if (data.username === 'admin' && data.password === '123') {
        // 跳转到首页
        console.log('登录成功')
        // 路由跳转
        router.push('/home')
    } else {
        console.log('登录失败')
    }
}
</script>

<style lang="css" scoped>
.login {
    width: 100vw;
    height: 100vh;
    background-image: linear-gradient(to bottom, #fff, #6ec5f0);
    display: flex;
    justify-content: center;
    align-items: center;
}

.login-wrap {
    width: 350px;
}

.flex {
    height: 50px;
    display: flex;
    align-items: center;
}

label {
    width: 60px;
}

input {
    flex: 1;
    font-size: 20px;
    padding: 5px;
}

.btn {
    width: 80%;
    font-size: 20px;
    padding: 10px 0;
    background-color: #ac4bf0;
    color: #fff;
    text-align: center;
    margin: 0 auto;
    margin-top: 30px;
    border-radius: 100px;
    cursor: pointer;
}
</style>