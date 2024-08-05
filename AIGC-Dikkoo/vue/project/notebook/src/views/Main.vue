<template>
    <router-view></router-view>
    <footer>
        <van-tabbar v-model="active">
            <van-tabbar-item icon="wap-home-o" replace to="/home">首页</van-tabbar-item>
            <van-tabbar-item icon="apps-o" replace to="/tags">分区</van-tabbar-item>
            <van-tabbar-item>
                <div class="post-note">
                    <van-icon name="edit" />
                </div>
            </van-tabbar-item>
            <van-tabbar-item icon="envelop-o" replace to="/messages">消息</van-tabbar-item>
            <van-tabbar-item icon="user-o" replace to="/myspace">我的</van-tabbar-item>
        </van-tabbar>
    </footer>
</template>

<script setup>
import { ref } from 'vue'

// 当前激活的tab
const active = ref(0)
</script>

<style lang="scss" scoped>
.post-note {
    margin: 0.2rem;
    width: 1.2rem;
    height: 1.2rem;
    border-radius: 25%;
    background: #1989fa;
    color: #fff;
    text-align: center;
    line-height: 1.2rem;
    font-size: 0.6rem;
}
</style>