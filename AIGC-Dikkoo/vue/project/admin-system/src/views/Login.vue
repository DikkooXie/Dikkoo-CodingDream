<template>
    <div class="login-bg">
        <div class="login-container">
            <header class="login-hd">
                <img src="../assets/images/logo.svg" alt="logo" class="logo">
                <div class="login-title">后台管理系统</div>
            </header>
            <el-form size="large" :model="form" :rules="rules" ref="loginForm">
                <el-form-item prop="username">
                    <el-input 
                        v-model="form.username" 
                        placeholder="请输入用户名">
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input 
                        v-model="form.password" 
                        type="password"
                        placeholder="请输入密码" 
                        show-password>
                    </el-input>
                </el-form-item>
                <div class="pwd-tips">
                    <el-checkbox 
                        class="pwd-checkbox" 
                        v-model="checked"
                        label="记住密码"
                    />
                    <el-link type="primary" @click="forgetPwd">忘记密码</el-link>
                </div>
                <el-form-item>
                    <el-button
                        type="primary" 
                        @click="login(loginForm)"
                        class="login-btn"
                    >
                        登录
                    </el-button>
                </el-form-item>
                <p class="login-tips">Tips: 用户名admin 密码123456</p>
                <p class="login-text">
                    没有账号？<el-link type="primary">立即注册</el-link>
                </p>
            </el-form>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const loginForm = ref(null); // 登录表单实例对象，其中包含`.validate()`方法，用于手动触发表单验证

const form = reactive({ // 登录表单数据
    username: '',
    password: ''
});

const rules = { // 表单验证规则
    username: [
        { 
            required: true,            // 是否必填
            message: '请输入用户名',     // 提示信息
            trigger: 'blur'            // 触发方式：失去焦点时触发
        }
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 6, max: 20, message: '密码应为 6 - 20 个字符', trigger: 'blur' }
    ]
};

const checked = ref(false); // 是否记住密码（默认否）

const login = (formEl) => { // 传入表单实例
    formEl.validate((valid) => { // 表单验证, valid为验证结果
        if(valid) { // 验证通过
            if(form.username === 'admin' && form.password === '123456') {
                ElMessage.success('登录成功');
                localStorage.setItem('role_name', 'admin');
                router.push('/');
            } else {
                ElMessage.error('用户名或密码错误');
            }
        }
    });
};

const forgetPwd = () => {
    ElMessage({
        type: 'warning',
        message: `请联系管理员重置密码`
    });
};
</script>

<style lang="css" scoped>
.login-bg {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100vh;
    background: url(../assets/img/login-bg.jpg) center/cover no-repeat;
}

.login-hd {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 40px;
}

.logo {
    width: 35px;
    margin-right: 10px;
}

.login-title {
    font-size: 22px;
    color: #333;
    font-weight: bold;
}

.login-container {
    width: 450px;
    border-radius: 5px;
    background: #fff;
    padding: 40px 50px 50px;
    box-sizing: border-box;
}

.pwd-tips {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    margin: 1rem 0 1rem;
    color: #787878;
}

.pwd-checkbox {
    height: auto;
}

.login-btn {
    display: block;
    width: 100%;
}

.login-tips {
    font-size: 12px;
    color: #999;
}

.login-text {
    display: flex;
    align-items: center;
    margin-top: 20px;
    font-size: 14px;
    color: #787878;
}
</style>