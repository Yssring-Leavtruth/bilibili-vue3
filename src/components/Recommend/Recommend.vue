<template>
    <layout-grid class="recommend">
        <div class="recommend-carousel">
            <carousel />
        </div>
        <div class="recommend-card-grid">
            <video-card v-for="i in 8" :key="data[i]" :data="data[i]">
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
        </div>
        <button class="border-button roll-button" @click="roll">
            <i
                class="iconfont roll-icon"
                :style="`transform: rotate(${140 + rollIcon_deg}deg)`"
                >&#xe602;</i
            >
            换一换
        </button>
    </layout-grid>
</template>

<script setup lang="ts">
import { computed, ref } from "vue"
import { formatStat, formatTime, getPubdate } from '../../utils'
import { recommendApi } from '../../api'
import LayoutGrid from "../common/LayoutGrid.vue"
import VideoCard from "../Card/VideoCard.vue"
import Carousel from "./Carousel.vue"
import axios from "axios"

const data = ref([])
const rollIcon_deg = ref(0)
let debounce = true

function roll(): void {
    rollIcon_deg.value += 360
    if (debounce) {
        debounce = false

        recommendApi().then((res) => {
            data.value = (res.data.item as object[]).map(item => {
                const name = item.owner.name + ' · ' + getPubdate(item.pubdate, false)
                return {
                    ...item,
                    owner: {
                        ...item.owner,
                        name
                    }
                }
            })

            debounce = true
        })
    }
}
roll()

</script>

<style lang="less">
.recommend {
    margin-bottom: 24px !important;

    .recommend-carousel {
        grid-column: span 2;
    }

    .recommend-card-grid {
        grid-column: span 4;
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 20px 12px;
    }

    .roll-button {
        position: absolute;
        top: 0;
        left: 100%;
        width: 40px;
        transform: translate(10px);
        padding: 9px;
        line-height: 13.15px;
        flex-wrap: wrap;

        .roll-icon {
            font-size: 14px;
            margin-bottom: 7px;
            transition: transform 0.5s;
        }
    }
}

@media screen and (max-width: 1700px) {
    .recommend {
        .recommend-card-grid {
            grid-column: span 3 !important;
            grid-template-columns: repeat(3, 1fr) !important;

            .card:nth-of-type(1n + 7) {
                display: none !important;
            }
        }
    }
}

@media screen and (max-width: 1100px) {
    .recommend {
        .recommend-card-grid {
            grid-column: span 2 !important;
            grid-template-columns: repeat(2, 1fr) !important;

            .card:nth-of-type(1n + 5) {
                display: none !important;
            }
        }
    }
}
</style>