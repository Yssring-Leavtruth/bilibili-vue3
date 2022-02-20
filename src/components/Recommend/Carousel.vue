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
            <a href="#">
                <img :src="list[left]?.img" ref="leftImageDom" crossOrigin />
            </a>
            <a href="#">
                <img
                    :src="list[center]?.img"
                    ref="centerImageDom"
                    crossOrigin
                />
            </a>
            <a href="#">
                <img :src="list[right]?.img" ref="rightImageDom" crossOrigin />
            </a>
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
import { computed, ref } from '@vue/reactivity'
import { onMounted, watch } from '@vue/runtime-core'
import { timeout } from '../../utils'
import { carouselApi } from '../../api'
import Card from '../Card/Card.vue'
import IColors from '../../utils/get-color'

interface iList { img: string, title: string }

let list: iList[] = ref([])
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

carouselApi().then((res) => {
    list.value = res
    list_length.value = list.value.length
    center.value = 0
    left.value = list.value.length - 1
    right.value = 1
})

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
    return list.value[center.value]?.title
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
            const color: number[] = colors[0].rgb
            const r = color[0] <= 150 ? color[0].toString(16) : (color[0] - 30).toString(16)
            const g = color[1] <= 150 ? color[1].toString(16) : (color[1] - 30).toString(16)
            const b = color[2] <= 150 ? color[2].toString(16) : (color[2] - 30).toString(16)
            mask.value.style.backgroundColor = '#' + r + g + b
        }
    }
})

//设定轮播图定时器
let timer: NodeJS.Timeout = setInterval(() => {
    turnRight()
}, timerDuration)

//绑定浏览器切换页面事件 切换出去时停止定时器
window.addEventListener('visibilitychange', function (): void {

    if (document.visibilityState === 'hidden') {
        clearInterval(timer)
    }
    else if (document.visibilityState === 'visible') {
        clearInterval(timer)
        timer = setInterval(() => {
            turnRight()
        }, timerDuration)
    }
})

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

function mouseenter(): void {
    clearInterval(timer)
}

function mouseleave(): void {
    clearInterval(timer)
    timer = setInterval(() => {
        turnRight()
    }, timerDuration)
}

function carouselJump(index: number): void {
    if (index === center.value) return

    isReverse.value = index < center.value ? true : false

    center.value = index
    right.value = center.value >= list.value.length - 1 ? 0 : center.value + 1
    left.value = center.value <= 0 ? list.value.length - 1 : center.value - 1
}

async function transitionend(): Promise<void> {

    animteDuration.value = 0
    center.value = direction.value === 1 ? right.value : left.value

    if (direction.value < 0 && right.value <= 0) {
        right.value = list.value.length - 1
    } else {
        right.value = center.value >= list.value.length - 1 ? 0 : right.value + direction.value
    }

    if (direction.value > 0 && left.value >= list.value.length - 1) {
        left.value = 0
    } else {
        left.value = center.value <= 0 ? list.value.length - 1 : left.value + direction.value
    }

    direction.value = 0

    await timeout()

    animteDuration.value = 300
}

</script>

<style lang="less" scoped>
.carousel {
    position: relative;
    border-radius: 6px;
    overflow: hidden;

    .carousel-footer {
        position: relative;

        .carousel-mask {
            position: absolute;
            left: 0;
            bottom: 0;
            z-index: 3;
            width: 100%;
            height: 870px;
            user-select: none;
            pointer-events: none;
            background-color: #939393;
            -webkit-mask-image: linear-gradient(
                0,
                #2f3238 11%,
                transparent 20%
            );
        }

        .carousel-control {
            position: absolute;
            z-index: 3;
            bottom: 42px;
            right: 15px;

            button {
                position: relative;
                width: 28px;
                height: 28px;
                color: #fff;
                border-style: none;
                border-radius: 8px;
                background-color: rgba(255, 255, 255, 0.1);
                cursor: pointer;

                &:hover {
                    background-color: rgba(255, 255, 255, 0.3);
                }

                &:active {
                    transform: scale(0.95);
                }

                &:first-child {
                    margin-right: 12px;
                }

                &:last-child {
                    .arrow {
                        transform: rotate(180deg);
                        top: 22px;
                        left: 15px;
                    }
                }

                .arrow {
                    position: absolute;
                    top: 6px;
                    left: 13px;

                    i {
                        position: absolute;
                        display: inline-block;
                        width: 2px;
                        height: 6px;
                        background-color: #fff;
                        border-radius: 5px;

                        &:first-child {
                            transform: rotate(45deg);
                            top: 3px;
                        }

                        &:last-child {
                            transform: rotate(-45deg);
                            top: 7px;
                        }
                    }
                }
            }
        }

        .carousel-tool {
            position: absolute;
            left: 15px;
            bottom: 14px;
            z-index: 3;

            a {
                display: flex;
                justify-content: flex-start;
                align-items: center;
                margin-bottom: 10px;
                font-size: 20px;
                color: #fff !important;
            }

            .case {
                margin-left: -1.5px;

                .is-active {
                    transform: scale(1.75);
                    background-color: transparent;

                    &.reverse {
                        transform: scale(1.75) rotate(179.9deg) !important;
                    }

                    @keyframes upper-jaw {
                        50% {
                            transform: rotate(-60deg);
                        }

                        100% {
                            transform: rotate(0deg);
                        }
                    }

                    @keyframes lower-jaw {
                        50% {
                            transform: rotate(60deg);
                        }

                        100% {
                            transform: rotate(0deg);
                        }
                    }

                    span {
                        position: absolute;
                        width: 160%;
                        height: 100%;
                        background-color: #fff;
                        left: -3px;
                    }

                    .before {
                        top: -50%;
                        animation-name: upper-jaw;
                        animation-duration: 400ms;
                        animation-timing-function: ease;
                        animation-iteration-count: 2;
                    }

                    .after {
                        bottom: -50%;
                        animation-name: lower-jaw;
                        animation-duration: 400ms;
                        animation-timing-function: ease;
                        animation-iteration-count: 2;
                    }
                }

                li {
                    display: inline-block;
                    position: relative;
                    border-radius: 100%;
                    width: 8px;
                    height: 8px;
                    background-color: rgba(255, 255, 255, 0.4);
                    margin: 4px;
                    overflow: hidden;
                    cursor: pointer;

                    span {
                        display: block;
                    }
                }
            }
        }
    }

    .carousel-skeleton {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 20px 12px;
        opacity: 0;
    }

    .carousel-transform {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 2;
        display: flex;
        align-items: center;

        div {
            width: (100 / 3%);
            font-size: 30px;
            font-weight: 800;
        }
    }
}

@media screen and (max-width: 1700px) {
    .carousel-mask {
        height: 810px !important;
    }
}

@media screen and (max-width: 1350px) {
    .carousel-mask {
        height: 790px !important;
    }
}

@media screen and (max-width: 1100px) {
    .carousel-mask {
        height: 780px !important;
    }
}
</style>