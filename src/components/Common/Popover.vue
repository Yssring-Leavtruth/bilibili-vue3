<template>
    <div class="popover" ref="popover" @mouseenter="enter">
        <teleport to="#popover-gounrd">
            <transition
                enter-active-class="popover-enter"
                leave-active-class="popover-leave"
            >
                <div
                    v-if="visible"
                    class="popover-content"
                    :style="styleOffset"
                    ref="content"
                >
                    <div class="popover-content__wrap">
                        <slot></slot>
                    </div>
                </div>
            </transition>
        </teleport>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from "@vue/reactivity"
import { nextTick, onBeforeUnmount, onMounted } from "vue"

const { diration } = defineProps({
    diration: String
})

const popover = ref(null)
const content = ref(null)
const visible = ref(false)
const isShow = ref(false)
const offset = {
    top: {
        x: '0',
        y: '10px'
    },
    bottom: {
        x: '0',
        y: '-10px'
    },
    left: {
        x: '10px',
        y: '0'
    },
    right: {
        x: '-10px',
        y: '0'
    }
}

function setPosition(target: HTMLElement, obj: HTMLElement): void {
    const { x, y } = target.getBoundingClientRect()
    const tWidth = target.offsetWidth, tHeight = target.offsetHeight
    const width = obj.offsetWidth, height = obj.offsetHeight

    const position = {
        top: {
            x: window.scrollX + (x + tWidth / 2 - width / 2),
            y: window.scrollY + y - height
        },
        bottom: {
            x: window.scrollX + (x + tWidth / 2 - width / 2),
            y: window.scrollY + y + tHeight
        },
        left: {
            x: window.scrollX + x - width,
            y: window.scrollY + (y + tHeight / 2 - height / 2)
        },
        right: {
            x: window.scrollX + x + tWidth,
            y: window.scrollY + (y + tHeight / 2 - height / 2)
        }
    }

    obj.style.left = position[diration].x + 'px'
    obj.style.top = position[diration].y + 'px'
}

let enterTimer: NodeJS.Timer
let leaveTimer: NodeJS.Timer

function mouseenter(e: MouseEvent): void {
    if (visible.value) return
    clearTimeout(enterTimer)
    clearTimeout(leaveTimer)
    enterTimer = setTimeout(async () => {
        visible.value = true
        await nextTick()
        const obj: HTMLElement = content.value
        setPosition(e.target, obj)
    }, 300)
}

function mouseleave(): void {
    clearTimeout(enterTimer)
    clearTimeout(leaveTimer)
    leaveTimer = setTimeout(() => {
        visible.value = false
    }, 300);
}

const styleOffset = computed(() => {
    return `--offset: ${offset[diration].x}, ${offset[diration].y};`
})

onMounted(() => {
    const popo = (popover.value as HTMLElement)
    popo.parentNode?.addEventListener('mouseenter', mouseenter)
    popo.parentNode?.addEventListener('mouseleave', mouseleave)
})

onBeforeUnmount(() => {
    const popo = (popover.value as HTMLElement)
    popo.parentNode?.removeEventListener('mouseenter', mouseenter)
    popo.parentNode?.removeEventListener('mouseleave', mouseleave)
    clearTimeout(enterTimer)
    clearTimeout(leaveTimer)
})

</script>


<style lang="less" scoped>
.popover-content {
    position: absolute;
    z-index: 99;
    pointer-events: none;

    .popover-content__wrap {
        border: 1px solid @gray1;
        border-radius: 8px;
        background-color: #fff;
        box-shadow: 0px 0px 25px 1px #c7c7c7c7;
        color: @text1;
    }
}

@keyframes show {
    0% {
        transform: translate(var(--offset));
        opacity: 0;
    }
    100% {
        transform: translate(0);
        opacity: 1;
    }
}

@keyframes hide {
    0% {
        transform: translate(0);
        opacity: 1;
    }
    100% {
        transform: translate(var(--offset));
        opacity: 0;
    }
}

.popover-enter {
    animation: show 0.25s ease-out;
}

.popover-leave {
    animation: hide 0.2s ease;
}
</style>