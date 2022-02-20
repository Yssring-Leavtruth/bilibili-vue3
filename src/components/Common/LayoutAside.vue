<template>
    <aside class="layout-aside">
        <div class="layout-aside__header">
            <div class="left">
                <slot name="header"></slot>
            </div>
        </div>
        <div class="layout-aside__body">
            <slot name="body"></slot>
        </div>
    </aside>
</template>

<style lang="less">
.layout-aside {
    display: flex;
    flex-direction: column;

    .layout-aside__header {
        height: 34px;
        margin-bottom: 12px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        line-height: 1.6;
        flex-shrink: 0;

        .left,
        .left *,
        .right {
            font-size: 24px;
            display: flex;
            align-items: center;
        }

        .left {
            margin-left: 10px;
        }
    }

    .layout-aside__body {
        flex-grow: 1;
        height: var(--body-height, 100%)
    }
}

@media screen and (max-width: 1350px) {
    .layout-aside__header {
        height: 28px !important;
        margin-bottom: 12px;
    }
}
</style>