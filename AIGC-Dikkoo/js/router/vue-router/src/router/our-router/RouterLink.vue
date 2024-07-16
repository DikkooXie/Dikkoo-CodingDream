<template>
    <a :href="'#' + props.to">
        <slot></slot>
    </a>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    to: {
        type: String,
        required: true
    }
})


</script>

<style lang="scss" scoped>

</style>