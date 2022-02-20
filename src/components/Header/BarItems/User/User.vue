<template>
    <bar-popover class="user-popover" @enter="enter" @leave="leave">
        <template #default>
            <a class="entry-userInfo" href="javascript:;">
                <div
                    class="avatar-box"
                    :class="{
                        'avatar-leave': visible,
                    }"
                >
                    <img :src="userInfo.face" />
                </div>
            </a>
        </template>
        <template #content>
            <user-popover/>
        </template>
    </bar-popover>
</template>

<script setup lang="ts">
import { inject, ref } from '@vue/runtime-core'
import BarPopover from '../BarPopover.vue'
import UserPopover from './UserPopover.vue'

const visible = ref(false)
const userInfo = inject('userInfo')

function enter(): void {
    visible.value = true
}

function leave(): void {
    visible.value = false
}

</script>

<style lang="less" scoped>
.user-popover {
    .entry-userInfo {
        display: flex;
        animation: none !important;
        // margin-right: 20px;

        .avatar-box {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            overflow: hidden;
            opacity: 1;
            transition: all .2s;

            .avatar {
                width: 40px;
                height: 40px;
            }

            &.avatar-leave {
                transform: translateY(30px);
                opacity: 0;
            }
        }
    }
}
</style>