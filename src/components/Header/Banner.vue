<template>
    <div class="header-banner">
        <div class="taper-line"></div>
        <img src="https://i0.hdslb.com/bfs/archive/839190887e48acd3960a850723f0e82e877946f0.png" />
    </div>
</template>
<script setup lang="ts">
</script>

<style lang="less">
.header-banner {
    position: relative;
    margin: 0 auto;
    min-width: 1000px;
    min-height: 155px;
    height: 9.375vw;
    max-height: 240px;
    background-color: @gray1;
    overflow: hidden;

    img {
        position: absolute;
        top: 0;
        left: 50%;
        width: inherit;
        transform: translateX(-50%);
    }

    .taper-line {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1;
        width: 100%;
        height: 100px;
        background: linear-gradient(rgba(0, 0, 0, 0.4), transparent);
        pointer-events: none;
    }
}
</style>
