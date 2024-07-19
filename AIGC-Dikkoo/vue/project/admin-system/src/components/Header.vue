<template>
    <header class="header">
        <div class="header-left">
            <div class="header-logo">
                <router-link to="/">
                    <img src="../assets/images/logo.svg" alt="logo" />
                </router-link>
            </div>
            <div class="header-title">
                <router-link to="/">后台管理系统</router-link>
            </div>
            <div class="collapse-btn" @click="sidebarToggle">
                <el-icon v-if="!sidebarStore.opened"><Expand /></el-icon>
                <el-icon v-else="sidebarStore.opened"><Fold /></el-icon>
            </div>
        </div>
        <div class="header-right">
            <div class="header-user">
                <!-- 用户头像 -->
                <el-avatar class="user-avatar" size="small" :src="avtImg" />
                <el-dropdown class="user-name" trigger="click" @command="handleCommand">
                    <!-- 用户名 -->
                    <span class="el-dropdown-link">
                        admin
                        <el-icon class="user-detail-icon"><ArrowDown /></el-icon>
                    </span>
                    <!-- 展开菜单，具名插槽 -->
                    <template #dropdown>
                        <el-dropdown-menu>
                            <a href="https://github.com/lin-xin/vue-manage-system">
                                <el-dropdown-item>官方文档</el-dropdown-item>
                            </a>
                            <el-dropdown-item>个人中心</el-dropdown-item>
                            <el-dropdown-item divided command="logout">退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>
        </div>
    </header>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useSidebarStore } from '../store/sidebar';
import { useRouter } from 'vue-router';

const sidebarStore = useSidebarStore();
const router = useRouter();

const sidebarToggle = () => {
    sidebarStore.toggleSidebar();
}; 

const avtImg = ref('https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png');

const handleCommand = (command) => {
    if (command === 'logout') {
        localStorage.removeItem('role_name');
        router.push('/login');
        console.log('退出登录');
    }
};

onMounted(() => {
    if(document.body.clientWidth <= 768) {
        sidebarToggle();
    }
});
</script>

<style lang="css" scoped>
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    width: 100%;
    height: 10%;
    color: var(--header-text-color);
    background-color: var(--header-bg-color);
    border-bottom: 1px solid #ddd;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}

.header-left {
    display: flex;
    align-items: center;
    padding-left: 1rem;
    height: 100%;
}

.header-logo {
    width: 2rem;
    margin: 0 0.5rem;
}

.header-title {
    margin: 0 2rem;
    font-family: 'Microsoft YaHei', sans-serif;
    font-size: 1.5rem;
    font-weight: bold;
    a {
        color: #fff;
        text-decoration: none;
    }
}

.collapse-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    padding: 0 10px;
    cursor: pointer;
    opacity: 0.8;
    font-size: 22px;
}

.collapse-btn:hover {
    opacity: 1;
}

.header-right {
    float: right;
    padding-right: 50px;
}

.header-user {
    display: flex;
    height: 70px;
    align-items: center;
    cursor: pointer;
    .user-avatar {
        margin: 0 10px 0 20px;
    }
    .user-detail-icon {
        margin-left: 0.5rem;
    }
}

.btn-fullscreen {
    transform: rotate(45deg);
    margin-right: 5px;
    font-size: 24px;
}

.btn-icon {
    position: relative;
    width: 30px;
    height: 30px;
    text-align: center;
    cursor: pointer;
    display: flex;
    align-items: center;
    color: var(--header-text-color);
    margin: 0 5px;
    font-size: 20px;
}

.btn-bell-badge {
    position: absolute;
    right: 4px;
    top: 0px;
    width: 8px;
    height: 8px;
    border-radius: 4px;
    background: #f56c6c;
    color: var(--header-text-color);
}

.el-dropdown-link {
    color: var(--header-text-color);
    cursor: pointer;
    display: flex;
    align-items: center;
}

.el-dropdown-menu__item {
    text-align: center;
}
</style>