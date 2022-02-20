<template>
    <layout-grid id="dance" v-lazy="load">
        <region-card-list
            link="https://www.bilibili.com/v/dance"
            title="舞蹈"
            @roll="roll"
        />
        <region-aside
            link="https://www.bilibili.com/v/popular/rank/dance"
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

        regionDynamicApi('dance').then(res => {
            recommendList.value = res.data.archives
            debounce = true
        })
    }
}

function load(): void {
    roll()
    rankApi('dance').then(res => {
        rank.value = res
    })
}
</script>