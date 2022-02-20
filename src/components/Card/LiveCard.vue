<template>
    <card
        :title="data?.title"
        :link="`https://live.bilibili.com${data?.link}`"
        :image-url="data?.cover"
        highlight-linkage
    >
        <template #title-icon>
            <live-icon/>
        </template>
        <template #statsLeft-first>
            <span class="iconfont stats-icon">&#xe6a6;</span>
            <span>
                <slot name="online" :online="data?.online">{{
                    data?.online
                }}</slot>
            </span>
        </template>
        <template #statsRight v-if="data?.face">
            <slot name="area_v2_name" :area_v2_name="data?.area_v2_name">{{
                data?.area_v2_name
            }}</slot>
        </template>
        <template #avatar v-if="data?.face">
            <a
                :href="uid"
                class="card__wrap-avatar"
                target="_blank"
            >
                <img :src="data?.face + '@72w_72h.webp'" class="avatar" />
            </a>
        </template>
        <template #infoBottom>
            <a
                :href="uid"
                target="_blank"
                class="info-small"
                >{{ data?.uname }}</a
            >
        </template>
    </card>
</template>

<script setup lang="ts">
import Card from './Card.vue'
import LiveIcon from './LiveIcon.vue'
import { computed } from 'vue'

const { data } = defineProps({
    data: Object
})

const uid = computed(() => {
    return `https://space.bilibili.com/${data?.uid}`
})
</script>

<style lang="less" scoped>

.stats-icon {
    font-size: 17px !important;
    padding-right: 3px !important;
}
</style>
