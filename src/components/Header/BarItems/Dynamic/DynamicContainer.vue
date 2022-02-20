<template>
    <loading v-if="isLoading" />
    <div v-else class="dynamic-container">
        <ul class="dynamic-container-list">
            <slot>
                <no-dynamic/>
            </slot>
        </ul>
        <div class="dynamic-container-footer">
            <a
                :href="footerLink"
                target="_blank"
                class="border-button footer-button"
                >查看全部</a
            >
        </div>
    </div>
</template>

<script setup lang="ts">
import NoDynamic from './NoDynamic.vue'
import Loading from './Loading.vue'
import { useSlots } from '@vue/runtime-core'

defineProps({
    footerLink: String,
    isLoading: {
        type: Boolean,
        default: true
    }
})
</script>

<style lang="less" scoped>
.dynamic-container {
    .dynamic-container-footer {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 30px;

        .footer-button {
            width: 90%;
            height: 100%;
            border: 0;
            font-size: 14px;
            border-radius: 6px;
            background-color: #f3f3f3;

            &:hover {
                background-color: #e7e7e7;
            }
        }
    }

    .dynamic-live-list {
        padding-bottom: 15px;
    }
}

</style>