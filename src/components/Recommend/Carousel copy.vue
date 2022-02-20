<template>
    <carousel-list v-if="list.length" :list="list" #default="{ data, focus }">
        <carousel-list-item v-for="(item, i) in data" :image-url="item.img" :focus="focus == i"/>
    </carousel-list>
</template>

<script setup lang="ts">
import CarouselList from './CarouselList.vue'
import CarouselListItem from './CarouselListItem.vue'
import { carouselApi } from '../../api'
import { ref } from '@vue/reactivity'

const list = ref([])

carouselApi().then(res => {
    list.value = res
})
</script>

<style lang="less" scoped>
</style>