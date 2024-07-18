<template>
    <header class="header">
        <div class="header-left">
            <div class="header-logo">
                <img src="../assets/images/logo.svg" alt="logo" />
            </div>
            <div class="header-title">
                <h1>后台管理系统</h1>
            </div>
            <div class="collapse-btn">
                <el-icon>
                    <Expand />
                </el-icon>
            </div>
        </div>
        <div class="header-right">
            <div class="header-user">
                <el-icon><UserFilled /></el-icon>
                <span>Admin</span>
            </div>
        </div>
    </header>
</template>

<script setup>

</script>

<style lang="css" scoped>
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    height: 60px;
    background-color: #f5f5f5;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.header-left {
    display: flex;
    align-items: center;
    height: 1rem;
}

.header-logo {
    width: 2rem;
    margin-right: 1rem;
}

.header-title {
    margin: 0;
    font-size: 20px;
    font-weight: 500;
}

.collapse-btn {
    margin-left: 1rem;
    cursor: pointer;
}

.header-right {
    display: flex;
    align-items: center;
}
</style>