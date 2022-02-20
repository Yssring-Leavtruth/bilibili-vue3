<template>
    <layout-grid id="live" v-lazy="load">
        <live-card-list
            link="https://live.bilibili.com"
            title="直播"
            @roll="roll"
        />
        <live-aside />
    </layout-grid>
</template>

<script setup lang="ts">
import LayoutGrid from '../../common/LayoutGrid.vue'
import LiveCardList from './LiveCardList.vue'
import LiveAside from './LiveAside.vue'
import { liveRecommendApi, liveApi } from '../../../api'
import { ref } from '@vue/reactivity'
import { provide } from '@vue/runtime-core'

const recommendList = ref([])
const liveData = ref({})
let debounce = true

provide('recommendList', recommendList)
provide('liveData', liveData)

function roll(): void {
    if (debounce) {
        debounce = false

        liveRecommendApi().then((res) => {
            recommendList.value = res
            debounce = true
        })
    }
}

function load(): void {
    roll()
    liveApi().then((res) => {
        liveData.value = res
    })
}
</script>
