<template>
    <div class="video-rank-list rank-list">
        <ul class="video-rank-list__grid rank-list__grid">
            <slot></slot>
        </ul>
    </div>
</template>

<style lang="less">
.video-rank-list {

    .video-rank-list__grid {
        grid-template-rows: repeat(9, 1fr);
        overflow: hidden;

        li:nth-of-type(1n + 10) {
            display: none !important;
        }
    }
}
</style>