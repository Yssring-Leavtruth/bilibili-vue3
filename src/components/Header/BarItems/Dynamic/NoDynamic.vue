<template>
<div class="dynamic-noDynamic">
    <p class="noDynamic-message">
        暂时没有新动态了哦！
    </p>
</div>
</template>

<script setup lang="ts">
</script>

<style lang="less" scoped>
.dynamic-noDynamic {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100px;

    .noDynamic-message {
        font-size: 14px;
        color: #999;
    }
}
</style>