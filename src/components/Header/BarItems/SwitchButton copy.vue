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
    display: flex;
    align-items: center;
    height: 100%;

    .btn-list {
        display: flex;
        font-size: 12px;
        color: #999;
        align-items: center;
        padding-left: 19px;
        user-select: none;

        .item {
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 0 20px 0 0;
            padding: 0;
            border-radius: 12px;
            cursor: pointer;
            transition: 0.3s ease;
            z-index: 1;

            &:hover {
                color: @bili-blue;
            }

            &.active {
                background-color: @bili-blue;
                color: #fff;
                padding: 4px 9px;
                margin: 0 12px 0 -9px;
            }
        }
    }
}
</style>