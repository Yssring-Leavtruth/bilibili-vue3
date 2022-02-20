<template>
    <div class="rank-list">
        <ul class="rank-list__grid">
            <slot></slot>
        </ul>
    </div>
</template>

<style lang="less">
.rank-list {
    height: 100%;

    .rank-list__grid {
        display: grid;
        height: 100%;
        border: @border-color;
        border-radius: 6px;
        overflow: hidden;
        background-color: #f6f7f8;

        li:nth-child(odd) {
            background-color: #fff;
        }

    }
}
</style>