<template>
    <div class="carousel-item" :class="{'focus-carousel': focus}">
        <a href="#">
            <img :src="imageUrl" crossorigin>
        </a>
    </div>
</template>

<script setup lang="ts">
defineProps({
    imageUrl: String,
    focus: {
        type: Boolean,
        default: false
    }
})
</script>

<style lang="less" scoped>
.carousel-item {
    position: absolute;
    top: 0;
    z-index: 0;
    width: calc(100% / 3);

    &.focus-carousel {
        z-index: 1;
        left: calc(100% / 3);
    }

    a {
        display: block;
    }
}
</style>