// sidebar 侧边栏状态共享
import { defineStore } from "pinia";

export const useSidebarStore = defineStore('sidebar', {
    state: () => { // 定义状态
        return {
            opened: false
        };
    },
    actions: { // 定义方法
        toggleSidebar() {
            this.opened = !this.opened;
        },
        closeSidebar() {
            this.opened = false;
        },
        openSidebar() {
            this.opened = true;
        }
    }
});