<template>
    <bar-popover class="history-popover">
        <template #default>
            <a class="history-title" href="javascript:;">
                <span>历史记录</span>
            </a>
        </template>
        <template #content>
            <component
                :is="
                    userInfo && userInfo.isLogin ? HistoryPopover : LoginPopover
                "
                @loginExpansion="loginExpansion"
            />
        </template>
    </bar-popover>
</template>

<script setup lang="ts">
import BarPopover from '../BarPopover.vue'
import HistoryPopover from './HistoryPopover.vue'
import LoginPopover from '../LoginPopover.vue'
import { inject } from '@vue/runtime-core'

const userInfo = inject('userInfo')
const loginExpansion = inject('loginExpansion')
</script>

<style lang="less" scoped>
.history-popover {
    .history-title {
        display: flex;
    }
}
</style>