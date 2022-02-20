<template>
<div class="dynamic-loading">
    <p class="loading-message">
        加载中...
    </p>
</div>
</template>

<script setup lang="ts">
</script>

<style lang="less" scoped>
.dynamic-loading {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100px;

    .loading-message {
        font-size: 14px;
        color: #999;
    }
}
</style>