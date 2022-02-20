<template>
    <bar-popover class="dynamic-popover">
        <template #default>
            <a class="dynamic-title" href="javascript:;">
                <span>动态</span>
            </a>
        </template>
        <template #content>
            <component
                :is="
                    userInfo && userInfo.isLogin ? DynamicPopover : LoginPopover
                "
                @loginExpansion="loginExpansion"
            />
        </template>
    </bar-popover>
</template>

<script setup lang="ts">
import BarPopover from '../BarPopover.vue'
import DynamicPopover from './DynamicPopover.vue'
import LoginPopover from '../LoginPopover.vue'
import { inject } from '@vue/runtime-core'

const userInfo = inject('userInfo')
const loginExpansion = inject('loginExpansion')
</script>

<style lang="less" scoped>
.dynamic-popover {
    .dynamic-title {
        display: flex;
    }
}
</style>