<template>
    <div class="switch-button">
        <ul class="btn-list">
            <li
                v-for="(item, i) in data"
                :key="item"
                :class="{ item, active: actived == i }"
                @click="click(i)"
            >
                <span>{{ actived == i ? item[1] : item[0] }}</span>
            </li>

        </ul>
    </div>
</template>

<script setup lang="ts">
import { ref } from "@vue/reactivity"

defineProps({
    data: Array
})

const actived = ref(0)
const emit = defineEmits(['click'])

function click(index: number): void {
    actived.value = index
    emit('click', index)
}
</script>

<style lang="less" scoped>
.switch-button {
    width: 100%;
    height: 100%;

    .btn-list {
        display: flex;
        align-items: stretch;
        height: 100%;
        font-size: 12px;
        color: #999;
        user-select: none;

        .item {
            display: flex;
            justify-content: center;
            align-items: center;
            flex: 1;
            position: relative;
            font-size: 14px;
            color: @text1;
            cursor: pointer;

            &.active {
                color: @bili-blue;

                &::before {
                    content: "";
                    position: absolute;
                    bottom: 0;
                    width: 100%;
                    height: 3px;
                    background-color: @bili-blue;
                }
            }
        }
    }
}
</style>