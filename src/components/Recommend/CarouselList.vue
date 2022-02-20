<template>
    <div class="carousel" @mouseenter="mouseenter" @mouseleave="mouseleave">
        <div class="carousel-skeleton">
            <card></card>
            <card></card>
            <card :is-info-show="false"></card>
            <card :is-info-show="false"></card>
        </div>
        <div
            class="carousel-transform"
            :style="translateX + width + transition"
            @transitionend="transitionend"
        >
            <slot :data="list" :focus="1"></slot>
        </div>
        <div class="carousel-footer">
            <div class="carousel-mask" ref="mask"></div>
            <div class="carousel-tool">
                <a href="#">{{ title }}</a>
                <ul class="case">
                    <li
                        v-for="i in list_length"
                        :key="i"
                        :class="{
                            'is-active': i - 1 === pacmanDirection,
                            reverse: isReverse,
                        }"
                        @click="carouselJump(i - 1)"
                    >
                        <span class="before"></span>
                        <span class="after"></span>
                    </li>
                </ul>
            </div>
            <div class="carousel-control">
                <button @click="turnLeft">
                    <span class="arrow">
                        <i></i>
                        <i></i>
                    </span>
                </button>
                <button @click="turnRight">
                    <span class="arrow">
                        <i></i>
                        <i></i>
                    </span>
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import './carousel.less'
import { computed, ref } from '@vue/reactivity'
import { onMounted, watch } from '@vue/runtime-core'
import { timeout } from '../../utils'
import { carouselApi } from '../../api'
import Card from '../Card/Card.vue'
import IColors from '../../utils/get-color'

const { list } = defineProps({
    list: Array
})

const list_length = ref(0)

const leftImageDom = ref(null)
const centerImageDom = ref(null)
const rightImageDom = ref(null)

const mask = ref(null)
const timerDuration = 3000

const direction = ref(0)
const animteDuration = ref(300)
const isReverse = ref(false)
const center = ref(0)
const left = ref(0)
const right = ref(0)


list_length.value = list.length
center.value = 0
left.value = list.length - 1
right.value = 1


//定义计算属性
const transition = computed((): string => {
    return `transition: transform ${animteDuration.value}ms;`
})

const translateX = computed((): string => {
    return `transform: translateX(${-(100 / 3) * (direction.value + 1)}%);`
})

const width = computed((): string => {
    return `width: ${100 * 3}%;`
})

const title = computed((): string => {
    return list[center.value]?.title
})

const pacmanDirection = computed((): number => {
    if (direction.value === 0) {
        return center.value
    } else if (direction.value === 1) {
        return right.value
    } else {
        return left.value
    }
})

//监听轮播方向变化来决定吃豆人是否翻转
watch(direction, (newVal, oldVal) => {
    if (oldVal === 0) {
        isReverse.value = direction.value === -1 ? true : false
        const image = isReverse.value ? leftImageDom.value : rightImageDom.value

        const iColor = new IColors({ space: 200, limit: 1 })
        const colors = iColor.getColors(image)
        if (colors.length) {
            const color = colors[0].rgb
            const rgb = `rgb(${color[0]},${color[1]},${color[2]})`
            mask.value.style.backgroundColor = rgb
        }
    }
})

// //设定轮播图定时器
// let timer: NodeJS.Timeout = setInterval(() => {
//     turnRight()
// }, timerDuration)

//绑定浏览器切换页面事件 切换出去时停止定时器
// window.addEventListener('visibilitychange', function (): void {

//     if (document.visibilityState === 'hidden') {
//         clearInterval(timer)
//     }
//     else if (document.visibilityState === 'visible') {
//         clearInterval(timer)
//         timer = setInterval(() => {
//             turnRight()
//         }, timerDuration)
//     }
// })

//定义方法

function turnRight(): void {
    if (direction.value === 0) {
        direction.value++
    }
}

function turnLeft(): void {
    if (direction.value === 0) {
        direction.value--
    }
}

// function mouseenter(): void {
//     clearInterval(timer)
// }

// function mouseleave(): void {
//     clearInterval(timer)
//     timer = setInterval(() => {
//         turnRight()
//     }, timerDuration)
// }

function carouselJump(index: number): void {
    if (index === center.value) return

    isReverse.value = index < center.value ? true : false

    center.value = index
    right.value = center.value >= list.length - 1 ? 0 : center.value + 1
    left.value = center.value <= 0 ? list.length - 1 : center.value - 1
}

async function transitionend(): Promise<void> {

    animteDuration.value = 0
    center.value = direction.value === 1 ? right.value : left.value

    if (direction.value < 0 && right.value <= 0) {
        right.value = list.length - 1
    } else {
        right.value = center.value >= list.length - 1 ? 0 : right.value + direction.value
    }

    if (direction.value > 0 && left.value >= list.length - 1) {
        left.value = 0
    } else {
        left.value = center.value <= 0 ? list.length - 1 : left.value + direction.value
    }

    direction.value = 0

    await timeout()

    animteDuration.value = 300
}

</script>