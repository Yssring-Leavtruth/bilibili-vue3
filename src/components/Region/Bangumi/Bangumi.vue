<template>
    <layout-grid id="bangumi" v-lazy="load">
        <bangumi-card-list
            link="https://www.bilibili.com/anime/"
            title="番剧"
        />
        <bangumi-aside
            link="https://www.bilibili.com/v/popular/rank/bangumi"
            title="排行榜"
        />
    </layout-grid>
</template>

<script setup lang="ts">
import LayoutGrid from '../../Common/LayoutGrid.vue'
import BangumiCardList from './BangumiCardList.vue'
import BangumiAside from './BangumiAside.vue'
import { regionDynamicApi, rankApi } from '../../../api'
import { ref } from '@vue/reactivity'
import { provide } from '@vue/runtime-core'

const latest = ref([])
const timeline = ref([])
const rank = ref([])

provide('latest', latest)
provide('timeline', timeline)
provide('rank', rank)

function load(): void {
    regionDynamicApi('bangumi').then((res) => {
        latest.value = res.result.latest
        timeline.value = res.result.timeline
    })
    rankApi('bangumi').then(res => {
        rank.value = res.list
    })
}
</script>