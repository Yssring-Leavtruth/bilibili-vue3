<template>
    <rank-list-item :num="num">
        <slot>
            <video-popover :title="title" :author="author" :pic="pic" :stat="stat"/>
        </slot>
        <a  
            ref="item"
            :href="link"
            target="_blank"
            :class="{
                'rank-video__item-card': true,
                'expanded-card': isExpand,
            }"
        >
            <div class="item-card__wrap-image">
                <img :src="pic">
            </div>
            <div class="item-card__wrap-info">
                <h3 class="rank-list__item-title" :title="title">{{ title }}</h3>
                <p class="info-small">综合得分：{{ formatStat(stat.pts) }}</p>
            </div>
        </a>
    </rank-list-item>
</template>

<script setup lang="ts">
import RankListItem from './RankListItem.vue'
import VideoPopover from '../Common/VideoPopover.vue'
import { formatStat } from '../../utils'

defineProps({
    num: Number,
    title: String,
    link: String,
    stat: Object,
    pic: String,
    author: String,
    isExpand: {
        type: Boolean,
        default: false
    }
})

</script>

<style lang="less" scoped>

.expanded-card {
    padding: 15px 0;
    --rank-cover: block;
    --line-clamp: 2;
    --small-display: -webkit-box;
}

.rank-video__item-card {
    display: flex;
    justify-content: flex-start;
    align-items: stretch;
    width: 100%;
    cursor: pointer;

    &:hover .rank-list__item-title {
        color: @bili-blue !important;
    }
}

.item-card__wrap-image {
    display: var(--rank-cover, none);
    margin-right: 6px;
    width: 90px;
    height: 56px;
    border-radius: 4px;
    overflow: hidden;
}

.item-card__wrap-info {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    flex-direction: column;
    min-width: 0;
    flex: 1;

    .info-small {
        display: var(--small-display, none);
        overflow: hidden;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        word-break: break-word !important;
    }

    .rank-list__item-title {
        display: -webkit-box;
        overflow: hidden;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: var(--line-clamp, 1);
        word-break: break-word !important;
        transition: color 0.3s;
    }
}

@media screen and (max-width: 1700px) {
    .info-small {
        font-size: 12px !important;
    }
}

@media screen and (max-width: 1350px) {
    .expanded-card {
        padding: 0 !important;
        --rank-cover: none;
        --line-clamp: 1;
        --small-display: none;
    }
}
</style>
