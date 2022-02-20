<template>
    <popover diration="top">
        <div class="Bangumi-popover">
            <div class="Bangumi-popover__wrap">
                <div class="Bangumi-popover__wrap-card">
                    <div class="card__wrap-image">
                        <div class="wrap-image__stat">
                            <i></i>
                            <span>{{ plays }}</span>
                        </div>
                        <img :src="pic"/>
                    </div>
                    <div class="card__wrap-info">
                        <h3 class="card__item-title" :title="title">
                            {{ title }}
                        </h3>
                        <p class="info-small">
                            综合得分：{{ pts }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </popover>
</template>

<script setup lang="ts">
import Popover from './Popover.vue'
import { formatStat } from '../../utils'

defineProps({
    title: String,
    pic: String,
    plays: String | Number,
    pts: String
})
</script>

<style lang="less" scoped>
.Bangumi-popover {
    // height: 120px;
    width: 315px;

    .Bangumi-popover__wrap {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 0 13px;

        .Bangumi-popover__wrap-card {
            display: flex;
            padding: 13px 0;

            .card__wrap-image {
                position: relative;
                margin-right: 6px;
                width: 90px;
                height: 56px;
                border-radius: 4px;
                overflow: hidden;

                .wrap-image__stat {
                    position: absolute;
                    z-index: 2;
                    bottom: 5px;
                    left: 5px;
                }
            }

            .card__wrap-info {
                display: flex;
                flex-direction: column;
                justify-content: space-evenly;
                flex: 1;

                .card__item-title {
                    display: -webkit-box;
                    font-size: 14px;
                    overflow: hidden;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 2;
                    word-break: break-word !important;
                    font-weight: 500;
                }

                .info-small {
                    font-size: 12px !important;
                }
            }
        }
    }
}
</style>