<template>
    <div class="live-icon">
        <img src="https://s1.hdslb.com/bfs/static/jinkela/long/images/live.gif"/>
        <span class="icon-info">直播中</span>
    </div>
</template>

<script setup lang="ts">
</script>


<style lang="less" scoped>
.live-icon {
    align-items: center;
    justify-content: flex-start;
    display: inline-flex;
    margin-right: 4px;
    padding-right: 4px;
    height: 18px;
    border: 1px solid #ff6699;
    border-radius: 4px;
    box-sizing: border-box;
    user-select: none;
    transform: translateY(1px);

    img {
        margin-left: 4px;
        margin-right: 3px;
        transform: translateZ(0);
        height: 12px !important;
        width: 12px !important;
    }

    span {
        font-size: 12px !important;
        line-height: 16px;
        font-weight: normal !important;
        color: #ff6699 !important;
    }
}
</style>