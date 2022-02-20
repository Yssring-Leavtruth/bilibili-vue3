<template>
    <card-list :link="link" :title="title" @roll="roll">
        <live-card
            v-for="i in 10"
            :key="data[i - 1]"
            :data="data[i - 1]"
        >
            <template #online="slotProps">
                {{ formatStat(slotProps.online) }}
            </template>
        </live-card>
    </card-list>
</template>

<script setup lang="ts">
import CardList from '../CardList.vue'
import LiveCard from '../../Card/LiveCard.vue'
import { formatStat } from '../../../utils'
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
