<template>
    <div class="live-rank-list rank-list">
        <ul class="live-rank-list__grid rank-list__grid">
            <slot></slot>
        </ul>
    </div>
</template>

<style lang="less">
.live-rank-list {

    .live-rank-list__grid {
        grid-template-rows: repeat(8, 1fr);
        overflow: hidden;

        li:nth-of-type(1n + 9) {
            display: none !important;
        }
    }

    @media screen and (max-width: 1700px) {
        .live-rank-list__grid {
            grid-template-rows: repeat(7, 1fr);

            li:nth-of-type(1n + 8) {
                display: none !important;
            }
        }
    }
}
</style>