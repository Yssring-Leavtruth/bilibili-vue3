<template>
    <bar-popover class="login-popover">
        <template #default>
            <a class="entry-userInfo" href="javascript:;">
                <div class="avatar-box" @click="loginExpansion">
                    <div class="unlogin-avatar">登录</div>
                </div>
            </a>
        </template>
        <template #content>
            <login-popover @loginExpansion="loginExpansion"/>
        </template>
    </bar-popover>
</template>

<script setup lang="ts">
import { inject } from '@vue/runtime-core'
import BarPopover from '../BarPopover.vue'
import LoginPopover from '../LoginPopover.vue'

const loginExpansion = inject('loginExpansion')
</script>

<style lang="less" scoped>
.login-popover {
    .entry-userInfo {
        display: flex;
        animation: none !important;
        // margin-right: 20px;

        .avatar-box {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            overflow: hidden;

            .unlogin-avatar {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                line-height: 40px;
                font-size: 14px;
                color: @bili-blue;
                letter-spacing: 0;
                background: #f6f6f6;
                text-align: center;
                font-weight: 600;
            }
        }
    }
}
</style>