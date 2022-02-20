<template>
    <layout-aside class="region-aside" style="--body-height: 1px">
        <template #header>
            <a :href="link" class="region-aside__title" target="_blank">
                <span class="title">{{ title }}</span>
            </a>
        </template>
        <template #body>
            <div class="region-aside__body">
                <VideoRankList>
                    <template v-for="(item, i) in data">
                        <VideoRankListItem
                            :num="i + 1"
                            :title="item.title"
                            :link="
                                'https://www.bilibili.com/video/' + item.bvid
                            "
                            :stat="stat[i]"
                            :pic="item.pic"
                            :author="item.author"
                            :isExpand="i == 0"
                        />
                    </template>
                </VideoRankList>
            </div>
        </template>
    </layout-aside>
</template>

<script setup lang="ts">
import LayoutAside from '../common/LayoutAside.vue'
import VideoRankList from '../Ranking/VideoRankList.vue'
import VideoRankListItem from '../Ranking/VideoRankListItem.vue'
import { ref } from '@vue/reactivity'
import { inject, watch } from '@vue/runtime-core'

const data = inject('rank')
const stat = ref([])

defineProps({
    link: String,
    title: String
})

watch(data, (value) => {
    if (value.length) {
        stat.value = value.map((item, i) => {
            return {
                pts: item.pts,
                coins: item.coins,
                favorites: item.favorites,
                play: item.play,
                review: item.review
            }
        })
    }
})

</script>

<style lang="less" scoped>
.region-aside {
    .region-aside__title {
        &:hover .title {
            color: @bili-blue !important;
        }
    }

    .region-aside__body {
        height: 100%;
    }
}
</style>