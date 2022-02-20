<template>
    <div
        class="bar-popover"
        ref="popover"
        @mouseenter="mouseenter"
        @mouseleave="mouseleave"
    >
        <div class="popover-title" ref="popover">
            <slot></slot>
        </div>
        <transition name="popover">
            <div
                class="popover-content"
                v-if="exist"
                v-show="visible"
                ref="content"
            >
                <div class="popover-content__wrap">
                    <slot name="content"></slot>
                </div>
            </div>
        </transition>
    </div>
</template>

<script setup lang="ts">
import { ref } from "@vue/reactivity"
import { nextTick } from "@vue/runtime-core"

const popover = ref(null)
const content = ref(null)
const exist = ref(false)
const visible = ref(false)
const positionX = ref('')

const emit = defineEmits(['enter', 'leave'])

let enterTimer: NodeJS.Timer
let leaveTimer: NodeJS.Timer

function setPosition(target: HTMLElement, obj: HTMLElement): void {
    const { x, y } = target.getBoundingClientRect()
    const tWidth = target.offsetWidth
    const width = obj.offsetWidth
    let obj_position = window.scrollX + (x + tWidth / 2 - width / 2)
    obj_position = obj_position + width > window.innerWidth - 40 ? window.innerWidth - width - 40 : obj_position

    obj.style.left = obj_position + 'px'
}

function mouseenter(): void {
    clearTimeout(enterTimer)
    clearTimeout(leaveTimer)
    enterTimer = setTimeout(async () => {
        if (!exist.value) exist.value = true
        visible.value = true
        emit('enter')

        await nextTick()
        const popo = (popover.value as HTMLElement)
        const con = (content.value as HTMLElement)
        setPosition(popo, con)
    }, 300)
}

function mouseleave(): void {
    clearTimeout(enterTimer)
    clearTimeout(leaveTimer)
    leaveTimer = setTimeout(() => {
        visible.value = false
        emit('leave')
    }, 300)
}

</script>


<style lang="less">
.bar-popover {
    display: flex;
    align-items: center;
    height: 64px;
    // position: relative;
    margin-right: 20px;

    .popover-title {
        font-size: 14px;

        a {
            @keyframes hover {
                0% {
                    transform: translateY(0);
                }

                50% {
                    transform: translateY(-4px);
                }

                100% {
                    transform: translateY(0);
                }
            }

            &:hover {
                animation: hover 0.3s ease-in-out;
            }
        }
    }

    .popover-content {
        position: absolute;
        top: 100%;
        // left: 50%;
        transform: translateY(0);
        z-index: 99;
        // padding-top: 10px;
        line-height: initial;

        .popover-content__wrap {
            border: 1px solid @gray1;
            border-radius: 6px;
            background-color: #fff;
            box-shadow: 0 0 30px #0000001a;
            color: @text1;
        }
    }

    .popover-enter-active {
        @keyframes show {
            from {
                opacity: 0;
                transform: translateY(-10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        animation: show 0.3s ease;
    }

    .popover-leave-active {
        @keyframes hide {
            from {
                opacity: 1;
                transform: translateY(0);
            }
            to {
                opacity: 0;
                transform: translateY(-10px);
            }
        }

        animation: hide 0.2s ease;
    }
}
</style>