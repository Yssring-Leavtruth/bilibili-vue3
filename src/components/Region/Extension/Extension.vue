<template>
    <layout-grid id="extension">
        <layout-area class="extension-area">
            <template #header-left>推广</template>
            <template #body>
                <div class="extension-area__body">
                    <template v-for="(item, index) in data">
                        <video-card
                            v-if="index <= 6"
                            :data="item"
                            :is-mask-show="!item.is_ad_loc"
                        >
                            <template #view="slotProps">
                                {{ formatStat(slotProps.view) }}
                            </template>
                            <template #like="slotProps">
                                {{ formatStat(slotProps.like) }}
                            </template>
                            <template #duration="slotProps">
                                {{ formatTime(slotProps.duration) }}
                            </template>
                        </video-card>
                    </template>
                </div>
            </template>
        </layout-area>
    </layout-grid>
</template>

<script setup lang="ts">
import { extensionApi } from '../../../api'
import { formatStat, formatTime } from '../../../utils'
import { ref } from "@vue/reactivity"
import LayoutGrid from "../../common/LayoutGrid.vue"
import LayoutArea from "../../common/LayoutArea.vue"
import VideoCard from '../../Card/VideoCard.vue'

const data = ref([])

extensionApi().then((res) => {
    const arr: Array<any> = [...res]
    data.value = arr.map((item) => {
        if (Object.keys(item).indexOf('archive') === -1) {
            return {
                is_ad_loc: true,
                title: item.title,
                uri: item.url,
                pic: item.pic,
                duration: '',
                stat: {
                    view: '',
                    like: ''
                },
                owner: {
                    mid: '',
                    face: '',
                    name: item.adver_name
                }
            }
        } else {
            return { uri: item.url, is_ad_loc: false, ...item.archive }
        }
    })
})

</script>

<style lang="less">
#extension {
    .extension-area {
        grid-column: span 6;

        .extension-area__body {
            display: grid;
            grid-template-columns: repeat(6, 1fr);
            gap: 12px;

            .card:nth-of-type(1n + 7) {
                display: none;
            }
        }
    }
}

@media screen and (max-width: 1700px) {
    .extension-area__body {
        grid-template-columns: repeat(5, 1fr) !important;

        .card:nth-of-type(1n + 6) {
            display: none !important;
        }
    }
}

@media screen and (max-width: 1100px) {
    .extension-area__body {
        grid-template-columns: repeat(4, 1fr) !important;

        .card:nth-of-type(1n + 5) {
            display: none !important;
        }
    }
}
</style>