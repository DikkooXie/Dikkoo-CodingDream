<template>
    <ul>
        <li 
        v-for="(item, index) in list" 
        :key="item.id"
        @click="clickHandler(item)"
        >
            {{index+1}} -- {{item.name}}
        </li>
    </ul>
</template>

<script setup>
const list = [
    { id: 1, name: 'apple' },
    { id: 2, name: 'banana' },
    { id: 3, name: 'cherry'}
]

let clickHandler = (item) => {
    console.log(item.name + ' is clicked')
}

</script>

<style lang="css" scoped>

</style>