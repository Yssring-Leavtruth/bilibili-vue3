<template>
    <div class="card-list__skeleton" :style="`--columns-count:${columns};`">
        <card v-for="i in columns"/>
    </div>
</template>

<script setup lang="ts">
import Card from '../Card/Card.vue'

defineProps({
    columns: Number
})
</script>

<style lang="less">
.card-list__skeleton {
    display: grid;
    grid-template-columns: repeat(var(--columns-count), 1fr);
    gap: 20px 12px;
    opacity: 0;
}

@media (min-width: 1100px) and (max-width: 1700px) {
    .card-list__skeleton {
        grid-template-columns: repeat(
            calc(var(--columns-count) - 1),
            1fr
        ) !important;

        .card {
            display: none;
        }

        .card:nth-last-of-type(1n + 2) {
            display: block !important;
        }
    }
}

@media screen and (max-width: 1100px) {
    .card-list__skeleton {
        grid-template-columns: repeat(
            calc(var(--columns-count) - 2),
            1fr
        ) !important;

        .card {
            display: none;
        }

        .card:nth-last-of-type(1n + 4) {
            display: block !important;
        }
    }
}
</style>