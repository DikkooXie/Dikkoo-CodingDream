<template>
    <!-- 瀑布流展示笔记 -->
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
    <van-list
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        class="waterfall-list"
    >
        <wc-waterfall :gap="10" :cols="2">
            <div v-for="item in postList" :key="item.postId" class="post-card">
                <img :src="item.cover" alt="" class="post-cover" />
                <div class="post-info">
                    <img :src="item.avatar" alt="" class="avatar" />
                    <div class="post-content">
                        <div class="post-title">{{ item.title }}</div>
                        <div class="post-meta">
                            <span>{{ item.username }}</span>
                            <span>{{ item.likes }} 赞</span>
                        </div>
                    </div>
                </div>
            </div>
        </wc-waterfall>
    </van-list>
    </van-pull-refresh>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';

const postList = reactive([
    {
        postId: 1,
        title: '暑假出游都去哪？',
        cover: 'https://images.pexels.com/photos/2444403/pexels-photo-2444403.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
        avatar: 'https://img.yzcdn.cn/vant/cat.jpeg',
        username: '张三',
        likes: 100,
    },
    {
        postId: 2,
        title: '家人们，谁懂啊！美哭了',
        cover: 'https://st4.depositphotos.com/13349494/22263/i/450/depositphotos_222632412-stock-photo-aerial-view-beautiful-hazy-mountains.jpg',
        avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPJtydZePQWuOVtLT7i6w_b9UpG26ZVX6JsQ&s',
        username: '李四',
        likes: 200,
    },
    {
        postId: 3,
        title: '夏天不看海怎么行？',
        cover: 'https://lh5.googleusercontent.com/proxy/Hg48nAEse-fCViflj92IHYq5Uskn5yHes0a6GQpt3Y5dDCg2oh1kl0T8RLnFe1vfs-SGLSnYFwOu0mTv9yLSAzPFZgP9bejoZyHcTbLCXzGVuPdSADdHBRNPkJYmunR3WXx6gKS5fQ',
        avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTX84mZ_p43hAgJyFSgLEu73F-sWyfs7EMjA&s',
        username: '王五',
        likes: 300,
    },
    {
        postId: 4,
        title: '如果没有胖东来，许昌怎么样',
        cover: 'https://static.timesmedia.com.cn/fusion-platform/baf7663456e11bf873fb2fcca4680e1c/20240516/076a4785a24a477981e9dec198ce8420.jpeg',
        avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgChUa4ZwWTQjBmtSFv3wigo49gHIFLfq5vw&s',
        username: '小贝',
        likes: 120,
    },
    {
        postId: 5,
        title: '家人们，谁懂啊！美哭了',
        cover: 'https://st4.depositphotos.com/13349494/22263/i/450/depositphotos_222632412-stock-photo-aerial-view-beautiful-hazy-mountains.jpg',
        avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPJtydZePQWuOVtLT7i6w_b9UpG26ZVX6JsQ&s',
        username: '李四',
        likes: 200,
    },
    {
        postId: 6,
        title: '踩坑！千万别去！',
        cover: 'https://static.timesmedia.com.cn/fusion-platform/baf7663456e11bf873fb2fcca4680e1c/20240516/076a4785a24a477981e9dec198ce8420.jpeg',
        avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgChUa4ZwWTQjBmtSFv3wigo49gHIFLfq5vw&s',
        username: '小贝',
        likes: 120,
    },
    {
        postId: 7,
        title: '惊呆了！这个地方竟然这么美',
        cover: 'https://images.pexels.com/photos/2444403/pexels-photo-2444403.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
        avatar: 'https://img.yzcdn.cn/vant/cat.jpeg',
        username: '王五',
        likes: 300
    }
])
const loading = ref(false);
const finished = ref(false);
const refreshing = ref(false);

const onLoad = () => {
    setTimeout(() => {
        loading.value = false;
        refreshing.value = false;
    }, 2000);
};

const onRefresh = () => {
    // 清空列表数据
    finished.value = false;

    // 重新加载数据
    // 将 loading 设置为 true，表示处于加载状态
    loading.value = true;
    onLoad();
};
</script>

<style lang="scss" scoped>
.waterfall-list {
    max-height: 100%;
    padding: 10px;
    overflow-y: hidden;
}
.post-card {
    background: #fff;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    .post-cover {
        width: 100%;
        object-fit: cover;
    }
    .post-info {
        display: flex;
        padding: 10px;
        .avatar {
            width: 1rem;
            height: 1rem;
            border-radius: 50%;
            margin-right: 10px;
        }
        .post-content {
            flex: 1;
            .post-title {
                font-size: 0.4rem;
                font-weight: 500;
                margin-bottom: 5px;
                line-height: 0.5rem;
            }
            .post-meta {
                font-size: 0.3rem;
                color: #999;
                span {
                    margin-right: 10px;
                }
            }
        }
    }
}
</style>