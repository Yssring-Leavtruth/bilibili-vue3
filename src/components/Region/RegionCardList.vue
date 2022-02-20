<template>
    <card-list :link="link" :title="title" @roll="roll">
        <video-card
            v-for="i in 10"
            :key="data[i - 1]"
            :data="data[i - 1]"
            :link="data[i - 1]?.short_link_v2"
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
    </card-list>
</template>

<script setup lang="ts">
import CardList from './CardList.vue'
import VideoCard from '../Card/VideoCard.vue'
import { formatStat, formatTime } from '../../utils'
import { inject } from '@vue/runtime-core'

const data = inject('recommendList')

const emit = defineEmits(['roll'])

defineProps({
    link: String,
    title: String
})

function roll() {
    emit('roll')
}

</script>