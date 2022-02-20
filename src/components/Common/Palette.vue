<template>
    <teleport to="body">
        <div class="palette">
            <div class="palette-inner">
                <div class="palette-wrap">
                    <button
                        class="border-button top-btn"
                        v-show="topBtnVisible"
                        @click="toTop"
                    >
                        <span class="iconfont top-icon">&#xf01a3;</span>
                        <span>顶部</span>
                    </button>
                </div>
            </div>
        </div>
    </teleport>
</template>

<script setup lang="ts">
import { onMounted, ref } from "@vue/runtime-core"

const topBtnVisible = ref(false)
let timer: NodeJS.Timer

function toTop(): void {
    window.scroll({ top: 0, left: 0, behavior: 'smooth' })
}

onMounted(() => {
    document.addEventListener('scroll', () => {
        clearTimeout(timer)
        timer = setTimeout(() => {
            if (window.scrollY >= 300) {
                topBtnVisible.value = true
            } else {
                topBtnVisible.value = false
            }
        }, 100)
    })
})
</script>

<style lang="less" scoped>
.palette {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 10;
    padding: 0 96px;
    background-color: transparent;
    transform: translate(0);
    pointer-events: none;

    .palette-inner {
        position: relative;
        width: 100%;
        height: 100%;

        .palette-wrap {
            position: absolute;
            bottom: 20px;
            left: 100%;
            width: 40px;
            transform: translate(10px);
            color: @text1;
            pointer-events: initial;

            .top-btn {
                @keyframes show {
                    from {
                        opacity: 0;
                    }
                    to {
                        opacity: 1;
                    }
                }

                flex-direction: column;
                width: 100%;
                padding: 8px 0 6px 0;
                animation: show 0.3s;

                .top-icon {
                    font-size: 12px;
                }
            }
        }
    }
}

@media (min-width: 1350px) and (max-width: 1700px) {
    .palette {
        padding: 0 64px !important;
        .palette-inner {
            .palette-wrap {
                bottom: 40px;
            }
        }
    }
}

@media screen and (max-width: 1350px) {
    .palette {
        padding: 0 56px !important;
        .palette-inner {
            .palette-wrap {
                opacity: 0.5;
            }
        }
    }
}
</style>