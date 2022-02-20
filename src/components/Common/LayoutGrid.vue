<template>
    <section class="card-grid">
        <slot></slot>
    </section>
</template>

<script setup lang="ts">
</script>


<style lang="less">
.card-grid {
    position: relative;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    column-gap: 12px;
    margin-bottom: 56px;
}

@media screen and (max-width: 1700px) {
    .card-grid {
        grid-template-columns: repeat(5, 1fr) !important;
    }
}

@media screen and (max-width: 1100px) {
    .card-grid {
        grid-template-columns: repeat(4, 1fr) !important;
    }
}
</style>