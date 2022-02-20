<template>
    <div class="header-bar" :class="{ 'bar-fixed': barFixed }">
        <bar-left-entry />
        <div class="center-searchBar">
            <search-bar />
        </div>
        <bar-right-entry />
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from '@vue/runtime-core'
import BarLeftEntry from './BarLeftEntry.vue'
import BarRightEntry from './BarRightEntry.vue'
import SearchBar from './SearchBar.vue'

const barFixed = ref(false)
let timer: NodeJS.Timer

onMounted(() => {
    document.addEventListener('scroll', () => {
        clearTimeout(timer)
        timer = setTimeout(() => {
            if (window.scrollY >= 100) {
                barFixed.value = true
            } else {
                barFixed.value = false
            }
        }, 100)
    })
})
</script>


<style lang="less">
.header-bar {
    position: absolute;
    top: 0;
    z-index: 99;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 24px;
    max-width: 2560px;
    width: 100%;
    height: 64px;
    --bar-color: #fff;

    &.bar-fixed {
        @keyframes fixed {
            from {
                transform: translateY(-100%);
            }
            to {
                transform: translateY(0);
            }
        }

        position: fixed;
        top: 0;
        background-color: #fff;
        box-shadow: 0px 0px 5px 1px #0000001a;
        animation: fixed 0.3s ease;
        --bar-color: @text1;

        .entry-title svg {
            color: @bili-blue !important;
        }
    }

    .center-searchBar {
        position: relative;
        flex: 1 auto;
        height: 38px;
        min-width: 180px;
        max-width: 500px;
    }
}
</style>