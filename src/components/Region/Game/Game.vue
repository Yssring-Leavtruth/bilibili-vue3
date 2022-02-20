<template>
    <layout-grid id="game" v-lazy="load">
        <region-card-list
            link="https://www.bilibili.com/v/game"
            title="游戏"
            @roll="roll"
        />
        <region-aside
            link="https://www.bilibili.com/v/popular/rank/game"
            title="排行榜"
        />
    </layout-grid>
</template>

<script setup lang="ts">
import LayoutGrid from '../../Common/LayoutGrid.vue'
import RegionCardList from '../RegionCardList.vue'
import RegionAside from '../RegionAside.vue'
import { regionDynamicApi, rankApi } from '../../../api'
import { ref } from '@vue/reactivity'
import { provide } from '@vue/runtime-core'

const recommendList = ref([])
const rank = ref([])
let debounce = true

provide('recommendList', recommendList)
provide('rank', rank)

function roll(): void {
    if (debounce) {
        debounce = false

        regionDynamicApi('game').then(res => {
            recommendList.value = res.data.archives
            debounce = true
        })
    }
}

function load(): void {
    roll()
    rankApi('game').then(res => {
        rank.value = res
    })
}
</script>