<template>
    <div class="login">
        <h1 class="login-title">注册</h1>
        <div class="login-wrapper">
            <div class="avatar">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgChUa4ZwWTQjBmtSFv3wigo49gHIFLfq5vw&s" alt="">
            </div>

            <van-form @submit="onRegister">
                <van-cell-group inset>
                    <van-field
                    v-model="username"
                    name="username"
                    label="账号"
                    placeholder="账号"
                    label-width="1.12rem"
                    :rules="[{ required: true, message: '请填写用户名' }]"
                    />
                    <van-field
                    v-model="nickname"
                    name="nickname"
                    label="昵称"
                    placeholder="昵称"
                    label-width="1.12rem"
                    :rules="[{ required: true, message: '请填写昵称' }]"
                    />
                    <van-field
                    v-model="password"
                    type="password"
                    name="password"
                    label="密码"
                    placeholder="密码"
                    label-width="1.12rem"
                    :rules="[{ required: true, message: '请填写密码' }]"
                    />
                </van-cell-group>
                <div style="margin: 16px;">
                    <van-button round block type="primary" native-type="submit">
                        注册
                    </van-button>
                </div>
            </van-form>
            <p class="register">
                已有账号？<router-link to="/login">点击登录</router-link>
            </p>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { showNotify } from 'vant'
import { useRouter } from 'vue-router'
import axios from '@/api'

const username = ref('');
const nickname = ref('');
const password = ref('');
const router = useRouter();

const onRegister = async (values) => {
    // console.log(values);
    const res = await axios.post('/user/register', values)
    console.log(res);
    showNotify({ type: 'success', message: '注册成功，即将跳转至登录页' });
    setTimeout(() => {
        router.push('/login');
    }, 3000);
}
</script>

<style lang="scss" scoped>
$login-bg-color: #f5f5f5;

.login {
    width: 100vw;
    height: 100vh;
    box-sizing: border-box;
    padding: 0 0.3rem;
    background: $login-bg-color;
    position: relative;
    overflow: hidden; // 防止键盘弹出时页面被顶起
    .login-title {
        height: 0.6933rem;
        font-size: 0.48rem;
        text-align: center;
        line-height: 0.6933rem;
        margin-top: 1.12rem;
    }
    .login-wrapper {
        width: 7.44rem;
        border: 1px solid rgba(187, 187, 187, 1);
        border-radius: 0.3rem;
        margin: 0 auto; // 块级元素水平居中
        margin-top: 1.7rem;
        padding: 0.8rem 0;
        box-shadow: 0 0 0.533rem rgba(170, 170, 170, 0.3);
        .avatar {
            width: 2.4rem;
            height: 2.4rem;
            margin: 1rem auto 0.77rem;
            border-radius: 50%;
            overflow: hidden;
            img {
                width: 100%;
            }
        }
    }
    .register {
        position: absolute;
        bottom: 0.8rem;
        left: 50%;
        transform: translateX(-50%);
        font-size: 0.32rem;
        color: #999;
        a {
            color: #007aff;
        }
    }
}
</style>