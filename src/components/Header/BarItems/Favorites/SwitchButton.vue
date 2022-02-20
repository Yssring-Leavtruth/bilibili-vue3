<template>
    <div class="switch-button">
        <ul class="btn-list">
            <li
                v-for="item in mediaList"
                :key="item.id"
                :class="{ item: true, active: actived == item.id }"
                @click="click(item.id)"
            >
                <span>{{ item.title }}</span>
                <span>{{ item.media_count }}</span>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { ref } from "@vue/reactivity"

const { folders } = defineProps({
    folders: Array
})

const actived = ref(folders[0].mediaListResponse.list[0].id)
const mediaList = folders[0].mediaListResponse.list

const emit = defineEmits(['click'])

function click(id: number): void {
    if (actived.value == id) return
    actived.value = id
    emit('click', id)
}
</script>

<style lang="less" scoped>
.switch-button {
    height: 100%;
    padding: 11px 0;

    .btn-list {
        display: flex;
        flex-direction: column;
        font-size: 13px;
        color: #999;
        user-select: none;

        .item {
            display: flex;
            padding: 0 16px;
            justify-content: space-between;
            align-items: center;
            height: 45px;
            cursor: pointer;
            transition: background-color .3s;

            &:hover {
                background-color: #f4f4f4;
            }

            &.active {
                background-color: @bili-blue;
                color: #fff;
            }
        }
    }
}
</style>