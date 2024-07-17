<template>
    <div class="error-page">
        <div class="error-message">
            <div class="error-code">404 Not Found</div>
            <div class="error-desc">
                页面不存在 ┭┮﹏┭┮
            </div>
            <div class="error-handle">
                <router-link to="/">
                    <el-button type="primary">返回首页</el-button>
                </router-link>
                <el-button class="error-btn" size="large" @click="goBack">返回上一页</el-button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const goBack = () => {
    router.go(-1); // 返回上一页
}
</script>

<style lang="css" scoped>
.error-page {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 100vh;
    background: #eef0fc;
    box-sizing: border-box;
}

.error-box {
    width: 400px;
    background-color: #fff;
    padding: 80px 50px;
    border-radius: 5px;
}

.error-code {
    line-height: 1;
    font-size: 4rem;
    font-weight: bold;
    color: var(--el-color-primary);
    margin-bottom: 1rem;
    text-align: center;
}

.error-desc {
    font-size: 1rem;
    color: #777;
    text-align: center;
}

.error-handle {
    margin-top: 4rem;
    text-align: center;
}

.error-btn {
    margin-left: 4rem;
}
</style>