<template>
    <div class="history-popover__content">
        <div class="popover__content-header">
            <switch-button :data="btnList" @click="click" />
        </div>
        <div class="popover__content-body scroll">
            <component :is="historyComponent[index]" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from '@vue/reactivity'
import { historyApi } from '../../../../api'
import SwitchButton from '../SwitchButton.vue'
import VideoHistory from './VideoHistory.vue'
import LiveHistory from './LiveHistory.vue'
import ArticleHistory from './ArticleHistory.vue'

const historyComponent = [VideoHistory, LiveHistory, ArticleHistory]
const index = ref(0)
const btnList = [['视频', '视频历史'], ['直播', '直播历史'], ['专栏', '专栏历史']]

function click(i): void {
    index.value = i
}

</script>

<style lang="less" scoped>
.history-popover__content {
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
        color: @text1;
    }
}
</style>