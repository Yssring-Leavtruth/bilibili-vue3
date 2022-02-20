<template>
    <div class="track-switch">
        <div
            class="track-switch__bar"
            :style="`left:${barLeft}px;width:calc(var(--width-diff, 0px) + ${barWidth}px);`"
        ></div>
        <div class="track-switch__wrap">
            <button
                v-for="(item, i) in buttons"
                :class="{ isActive: index == i }"
                @click="click(i)"
            >
                {{ item }}
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "@vue/reactivity"

const buttons = ['最新更新', '周一', '周二', '周三', '周四', '周五', '周六', '周日']

const emit = defineEmits(['click'])
const barLeft = ref(0)
const barWidth = ref(86)

defineProps({
    index: {
        type: Number,
        default: 0
    }
})

function click(i): void {
    emit('click', i)
    const leftDiff = window.innerWidth > 1100 ? 0 : -6
    const latestWidth = 86 + leftDiff
    if (i) {
        barWidth.value = 58
        barLeft.value = latestWidth + (i - 1) * (58 + leftDiff)
    } else {
        barWidth.value = 86
        barLeft.value = 0
    }
}
</script>


<style lang="less" scoped>
.track-switch {
    position: relative;
    height: 28px;
    border-radius: 14px;
    background-color: #f6f7f8;

    .track-switch__bar {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1;
        width: 86px;
        height: 100%;
        border-radius: 14px;
        background-color: @bili-blue;
        transition: all 0.3s;
    }

    .track-switch__wrap {
        .isActive {
            color: #fff;
        }

        button {
            position: relative;
            z-index: 2;
            padding: 6px 15px;
            border-radius: 14px;
            font-size: 14px;
            color: @gray3;
            transition: color .3s;
        }
    }
}

@media screen and (max-width: 1100px) {
    .track-switch {
        background-color: inherit;
        --width-diff: -6px;

        button {
            padding: 6px 12px !important;
        }
    }
}
</style>