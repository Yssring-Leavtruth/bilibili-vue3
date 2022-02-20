<template>
    <div class="dynamic-popover__content">
        <div class="popover__content-header">
            <switch-button :data="btnList" @click="click" />
        </div>
        <div class="popover__content-body scroll">
            <component :is="dynamicComponent[index]" />
        </div>
    </div>
</template>

<script setup lang="ts">
import VideoDynamic from './VideoDynamic.vue'
import LiveDynamic from './LiveDynamic.vue'
import ArticleDynamic from './ArticleDynamic.vue'
import SwitchButton from '../SwitchButton.vue'
import { ref } from '@vue/reactivity'

const dynamicComponent = [VideoDynamic, LiveDynamic, ArticleDynamic]
const index = ref(0)
const btnList = [['视频', '视频动态'], ['直播', '直播动态'], ['专栏', '专栏动态']]

function click(i): void {
    index.value = i
}
</script>

<style lang="less" scoped>
.dynamic-popover__content {
    display: flex;
    flex-direction: column;
    width: 350px;

    .popover__content-header {
        height: 47px;
        border-bottom: 1px solid @gray1;
    }

    .popover__content-body {
        flex: 1;
        max-height: 450px;
        padding: 11px 0;
        color: @text1;
    }
}
</style>