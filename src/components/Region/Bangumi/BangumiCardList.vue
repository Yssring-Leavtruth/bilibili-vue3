<template>
    <card-list :link="link" :title="title" is-scroll>
        <template #header-left>
            <track-switch :index="index" @click="click" />
        </template>
        <template #header-right>
            <a
                target="_blank"
                :href="link + 'timeline'"
                class="border-button area-header__botton"
            >
                <span>新番时间表</span>
                <i class="iconfont arrow-icon">&#xe51b;</i>
            </a>
            <a
                target="_blank"
                :href="link"
                class="border-button area-header__botton"
            >
                <span>查看更多</span>
                <i class="iconfont arrow-icon">&#xe51b;</i>
            </a>
        </template>
        <bangumi-card
            class="bangumi-card"
            v-for="i in data.length > 10 ? 10 : data.length"
            :key="data[i - 1]"
            :data="data[i - 1]"
            :link="`https://www.bilibili.com/bangumi/play/ep${data[i - 1].episode_id}`"
        >
        </bangumi-card>
    </card-list>
</template>

<script setup lang="ts">
import TrackSwitch from './TrackSwitch.vue'
import CardList from '../CardList.vue'
import BangumiCard from '../../Card/BangumiCard.vue'
import { ref } from '@vue/reactivity'
import { formatStat } from '../../../utils'
import { inject, watch } from '@vue/runtime-core'

const data = ref([])
const latest = inject('latest')
const timeline = inject('timeline')
const index = ref(0)

defineProps({
    link: String,
    title: String
})

function click(i): void {
    index.value = i
    if (i) {
        data.value = timeline.value[i - 1].episodes
    } else {
        data.value = latest.value
    }
}

watch(latest, (value) => {
    if (value.length) {
        data.value = value
    }
})
</script>

<style lang="less" scoped>
.bangumi-card {
    &:nth-of-type(1n + 11) {
        display: none !important;
    }
}
</style>