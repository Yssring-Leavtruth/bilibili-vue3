<template>
    <layout-aside class="bangumi-aside" style="--body-height: 1px">
        <template #header>
            <a :href="link" class="bangumi-aside__title" target="_blank">
                <span class="title">{{ title }}</span>
            </a>
        </template>
        <template #body>
            <div class="bangumi-aside__body">
                <VideoRankList>
                    <template v-for="(item, i) in data">
                        <VideoRankListItem
                            :num="i + 1"
                            :title="item.title"
                            :link="item.url"
                            :stat="stat[i]"
                            :pic="item.ss_horizontal_cover"
                            :isExpand="i == 0"
                        >
                            <bangumi-popover
                                :title="item.title"
                                :pic="item.ss_horizontal_cover"
                                :pts="formatStat(item.pts)"
                            />
                        </VideoRankListItem>
                    </template>
                </VideoRankList>
            </div>
        </template>
    </layout-aside>
</template>

<script setup lang="ts">
import LayoutAside from '../../Common/LayoutAside.vue'
import BangumiPopover from '../../Common/BangumiPopover.vue'
import VideoRankList from '../../Ranking/VideoRankList.vue'
import VideoRankListItem from '../../Ranking/VideoRankListItem.vue'
import { formatStat } from '../../../utils'
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
            }
        })
    }
})

</script>

<style lang="less" scoped>
.bangumi-aside {
    .bangumi-aside__title {
        &:hover .title {
            color: @bili-blue !important;
        }
    }

    .bangumi-aside__body {
        height: 100%;
    }
}
</style>