<template>
    <layout-area
        class="card-list"
        :style="`--columns-count:${columns};
        --overflow-scroll:${isScroll ? 'scroll' : 'hidden'};`"
    >
        <template #header-left>
            <a :href="link" target="_blank" class="link title">{{ title }}</a>
            <slot name="header-left"></slot>
        </template>
        <template #header-right>
            <slot name="header-right">
                <button class="border-button area-header__botton" @click="roll">
                    <i
                        class="iconfont roll-icon"
                        :style="`transform: rotate(${-45 + rollIcon_deg}deg);`"
                        >&#xe602;</i
                    >
                    <span>换一换</span>
                </button>
                <a
                    target="_blank"
                    :href="link"
                    class="border-button area-header__botton"
                >
                    <span>查看更多</span>
                    <i class="iconfont arrow-icon">&#xe51b;</i>
                </a>
            </slot>
        </template>
        <template #body>
            <card-list-skeleton v-for="i in rows" :columns="columns" />
            <div class="card-body">
                <slot></slot>
            </div>
        </template>
    </layout-area>
</template>

<script setup lang="ts">
import LayoutArea from '../common/LayoutArea.vue'
import CardListSkeleton from './CardListSkeleton.vue'
import { ref } from '@vue/reactivity'

defineProps({
    title: String,
    link: String,
    isScroll: {
        type: Boolean,
        default: false
    },
    columns: {
        type: Number,
        default: 5
    },
    rows: {
        type: Number,
        default: 2
    }
})

const emit = defineEmits(['roll'])

const rollIcon_deg = ref(0)

function roll() {
    rollIcon_deg.value += 360
    emit('roll')
}
</script>

<style lang="less">
.card-list {
    grid-column: span var(--columns-count);

    .card-list__skeleton:nth-of-type(1n + 2) {
        margin-top: 20px;
    }

    .card-body {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        display: grid;
        grid-template-columns: repeat(var(--columns-count), 1fr);
        gap: 20px 12px;
    }
}

@media (min-width: 1100px) and (max-width: 1700px) {
    .card-list {
        grid-column: span calc(var(--columns-count) - 1);

        .card-body {
            grid-template-columns: repeat(
                calc(var(--columns-count) - 1),
                1fr
            ) !important;

            // .card {
            //     display: none;
            // }

            // .card:nth-last-of-type(1n + 3) {
            //     display: block !important;
            // }
        }
    }
}

@media screen and (max-width: 1100px) {
    .card-list {
        grid-column: span calc(var(--columns-count) - 2);

        .card-body {
            grid-template-columns: repeat(
                calc(var(--columns-count) - 2),
                1fr
            ) !important;

            // .card {
            //     display: none;
            // }

            // .card:nth-last-of-type(1n + 5) {
            //     display: block !important;
            // }
        }
    }
}
</style>