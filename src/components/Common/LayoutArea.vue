<template>
    <div class="layout-area">
        <div class="layout-area__header">
            <div class="left">
                <slot name="header-left"></slot>
            </div>
            <div class="right">
                <slot name="header-right"></slot>
            </div>
        </div>
        <div class="layout-area__body">
            <slot name="body"></slot>
        </div>
    </div>
</template>

<style lang="less">
.layout-area {
    .layout-area__header {
        height: 34px;
        margin-bottom: 12px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        line-height: 1.6;
        color: @text1;

        .left,
        .left *,
        .right {
            font-size: 24px;
            display: flex;
            align-items: center;
        }
    }

    .layout-area__body {
        position: relative;
        overflow-x: hidden;
        overflow-y: var(--overflow-scroll, hidden);

        &::-webkit-scrollbar {
            display: none !important;
            // position: absolute;
            // top: 0;
            // right: 0;
            // z-index: 4;
        }
    }
}

@media screen and (max-width: 1350px) {
    .layout-area__header {
        height: 28px !important;
        margin-bottom: 12px !important;
    }
}
</style>