<template>
    <popover diration="top">
        <div class="video-popover">
            <div class="video-popover__wrap">
                <div class="video-popover__wrap-card">
                    <div class="card__wrap-image">
                        <img :src="pic" />
                    </div>
                    <div class="card__wrap-info">
                        <h3 class="card__item-title" :title="title">
                            {{ title }}
                        </h3>
                        <p class="info-small">
                            {{ author }}
                        </p>
                    </div>
                </div>
                <div class="video-popover__wrap-stat">
                    <div class="stat-item">
                        <i class="iconfont">&#xe612;</i>
                        <span class="info-small">{{
                            formatStat(stat.play)
                        }}</span>
                    </div>
                    <div class="stat-item">
                        <i class="iconfont">&#xe665;</i>
                        <span class="info-small">{{
                            formatStat(stat.review)
                        }}</span>
                    </div>
                    <div class="stat-item">
                        <i class="iconfont">&#xeca7;</i>
                        <span class="info-small">{{
                            formatStat(stat.favorites)
                        }}</span>
                    </div>
                    <div class="stat-item">
                        <i class="iconfont">&#xe603;</i>
                        <span class="info-small">{{
                            formatStat(stat.coins)
                        }}</span>
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
    author: String,
    pic: String,
    stat: Object
})
</script>

<style lang="less" scoped>
.video-popover {
    // height: 120px;
    width: 315px;

    .video-popover__wrap {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 0 13px;

        .video-popover__wrap-card {
            display: flex;
            padding: 13px 0;

            .card__wrap-image {
                margin-right: 6px;
                width: 90px;
                height: 56px;
                border-radius: 4px;
                overflow: hidden;
            }

            .card__wrap-info {
                display: flex;
                flex-direction: column;
                justify-content: space-between;
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

        .video-popover__wrap-stat {
            display: flex;
            justify-content: space-between;
            padding: 12px 0;
            border-top: 1px solid @gray1;

            .stat-item {
                display: flex;
                align-items: flex-end;

                i {
                    color: #9499a0;
                    margin-right: 4px;
                }
            }
        }
    }
}
</style>