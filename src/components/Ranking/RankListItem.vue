<template>
    <li class="rank-list__item">
        <div class="rank-list__item-wrap">
            <span class="rank-list__item-index" :data-index="num">{{
                num
            }}</span>
            <slot></slot>
        </div>
    </li>
</template>

<script setup lang="ts">
defineProps({
    num: Number
})
</script>
