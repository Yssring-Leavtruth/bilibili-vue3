<template>
    <layout-aside class="live-aside">
        <template #header>
            <div class="live-aside__header">
                <button
                    :class="{ 'is-active': liveAsideSwitch == 0 }"
                    @click="change(0)"
                >
                    直播排行
                </button>
                <button
                    :class="{ 'is-active': liveAsideSwitch == 1 }"
                    @click="change(1)"
                >
                    为你推荐
                </button>
            </div>
        </template>
        <template #body>
            <div class="loading-mask" v-if="!data.online_total"></div>
            <div class="live-aside__body">
                <div class="live-ranking" v-if="liveAsideSwitch == 0">
                    <LiveRankList>
                        <template v-for="(item, i) in data.ranking_list">
                            <LiveRankListItem
                                :num="i + 1"
                                :face="item.face"
                                :uname="item.uname"
                                :link="item.link"
                                :title="item.title"
                                :online="item.online"
                            />
                        </template>
                    </LiveRankList>
                </div>
                <div class="live-recommend" v-if="liveAsideSwitch == 1">
                    <card
                        v-for="i in data.new_preview_banner_list"
                        :title="i.title"
                        :link="i.link"
                        :image-url="i.pic"
                        :is-mask-show="false"
                        highlight-linkage
                    />
                </div>
            </div>
        </template>
    </layout-aside>
</template>

<script setup lang="ts">
import LayoutAside from '../../common/LayoutAside.vue'
import LiveRankList from '../../Ranking/LiveRankList.vue'
import LiveRankListItem from '../../Ranking/LiveRankListItem.vue'
import Card from '../../Card/Card.vue'
import { ref } from '@vue/reactivity'
import { inject } from '@vue/runtime-core'

const data = inject('liveData')
const liveAsideSwitch = ref(1)

function change(index): void {
    liveAsideSwitch.value = index
}
</script>

<style lang="less" scoped>
.live-aside {
    .live-aside__header {
        button {
            position: relative;
            font-size: 14px;
            height: 20px;
            line-height: 20px;
            margin-right: 10px;
            color: @gray3;

            &.is-active {
                color: #00aeec;

                &:after {
                    content: "";
                    position: absolute;
                    left: 50%;
                    bottom: -4px;
                    width: 48px;
                    border: 1px solid #00aeec;
                    border-radius: 2px;
                    transform: translateX(-50%);
                }
            }
        }
    }

    .loading-mask {
        height: 100%;
        background-color: #e3e5e7;
        border-radius: 6px;
    }

    .live-aside__body {
        height: 100%;

        .live-ranking {
            height: 100%;
        }

        .live-recommend {
            display: grid;
            grid-template-rows: repeat(2, 1fr);
            gap: 20px;
        }
    }
}

@media screen and (max-width: 1100px) {
    .live-ranking__list {
        --ranking-count: 7 !important;
    }
}
</style>