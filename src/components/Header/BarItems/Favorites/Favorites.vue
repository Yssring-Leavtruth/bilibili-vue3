<template>
    <bar-popover class="favorites-popover">
        <template #default>
            <a class="favorites-title" href="javascript:;">
                <span>收藏</span>
            </a>
        </template>
        <template #content>
            <component
                :is="
                    userInfo && userInfo.isLogin ? FavoritesPopover : LoginPopover
                "
                @loginExpansion="loginExpansion"
            />
        </template>
    </bar-popover>
</template>

<script setup lang="ts">
import BarPopover from '../BarPopover.vue'
import FavoritesPopover from './FavoritesPopover.vue'
import LoginPopover from '../LoginPopover.vue'
import { inject } from '@vue/runtime-core'

const userInfo = inject('userInfo')
const loginExpansion = inject('loginExpansion')
</script>

<style lang="less" scoped>
.favorites-popover {
    .favorites-title {
        display: flex;
    }
}
</style>