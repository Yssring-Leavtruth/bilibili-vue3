<template>
    <card
        :title="title ? title : data?.title"
        :link="link ? link : data?.episode_id"
        :image-url="cover ? cover : data?.ep_cover"
        mask-fixate
    >   
        <template #title-icon v-if="data?.is_ad_loc">
            <ad-icon/>
        </template>
        <template #statsLeft-first v-if="data?.plays">
            <span class="iconfont stats-icon">&#xe612;</span>
            <span>
                <slot name="plays" :view="data?.plays">{{
                    data?.plays
                }}</slot>
            </span>
        </template>
        <template #statsRight v-if="data?.follows">
            <slot name="follows" :duration="data?.follows">{{
                data?.follows
            }}</slot>
        </template>
        <template #infoBottom v-if="data?.pub_index">
            <a :href="link" target="_blank" class="info-small">{{
                (data?.published ? '更新至' : '') + data?.pub_index
            }}</a>
        </template>
    </card>
</template>

<script setup lang="ts">
import Card from './Card.vue'
import AdIcon from './ADIcon.vue'

const { data } = defineProps({
    data: Object,
    title: {
        type: String,
        default: ''
    },
    cover: {
        type: String,
        default: ''
    },
    link: {
        type: String,
        default: ''
    }
})

</script>

<style lang="less" scoped>
.author {

    &:hover {
        color: @bili-blue;
    }
}
.stats-icon {
    font-size: 17px !important;
    padding-right: 3px !important;
}
</style>