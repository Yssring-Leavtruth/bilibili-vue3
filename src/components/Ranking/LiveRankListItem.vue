<template>
    <rank-list-item :num="num">
        <a :href="link" target="_blank" class="rank-live__item-card">
                <div class="item-card__wrap">
                    <div class="card__wrap-avatar">
                        <img :src="face + '@72w_72h.webp'" class="avatar" />
                    </div>
                    <div class="item-card__wrap-info">
                        <div class="info-left">
                            <p class="info-title">
                                <img src="https://s1.hdslb.com/bfs/static/jinkela/long/images/live.gif">
                                <h3 class="rank-list__item-title">{{uname}}</h3>
                            </p>
                            <p class="info-small" :title="title">{{title}}</p>
                        </div>
                        <div class="info-right">
                            <span class="num">{{ formatStat(online) }}</span>
                            <span class="online info-small">在线</span>
                        </div>
                    </div>
                </div>
            </a>
    </rank-list-item>
</template>

<script setup lang="ts">
import './RankList.less'
import RankListItem from './RankListItem.vue'
import { formatStat } from '../../utils'

defineProps({
    face: String,
    num: Number,
    uname: String,
    title: String,
    link: String,
    online: Number | String
})
</script>

<style lang="less" scoped>
.rank-live__item-card {
    display: inline-block;
    width: 100%;

    &:hover .rank-list__item-title {
        color: @bili-blue !important;
    }

    .item-card__wrap {
        display: flex;
        align-items: center;
        justify-content: flex-start;

        .card__wrap-avatar {
            padding: 0;
            width: 36px;
            height: 36px;
            margin-right: 8px;
        }

        .item-card__wrap-info {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            flex: 1;

            .info-left {
                flex: 1;

                .info-title {
                    display: flex;
                    align-items: center;

                    img {
                        margin-right: 3px;
                        transform: translateZ(0);
                        height: 12px !important;
                        width: 12px !important;
                    }

                    h3 {
                        display: -webkit-box;
                        margin-top: 2px;
                        overflow: hidden;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 1;
                        word-break: break-word!important;
                        transition: color 0.3s;
                    }
                }

                .info-small {
                    display: -webkit-box;
                    margin-top: 2px;
                    overflow: hidden;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 1;
                }
            }

            .info-right {
                margin-left: 8px;
                text-align: right;

                .num {
                    display: block;
                    font-weight: 600;
                    font-size: 12px;
                    line-height: 18px;
                    color: @gray3;
                }

                .online {
                    display: block;
                    line-height: 16px;
                    margin-top: 2px;
                }
            }
        }
    }

    @media screen and (max-width: 1350px) {
        .card__wrap-avatar {
            display: none !important;
        }
    }
}
</style>