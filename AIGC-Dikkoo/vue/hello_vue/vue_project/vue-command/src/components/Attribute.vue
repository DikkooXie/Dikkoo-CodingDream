<template>
    <img v-bind:src="picture">
</template>

<script setup>
import { ref } from 'vue'

const picture = 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png'
</script>

<style lang="css" scoped>

</style>