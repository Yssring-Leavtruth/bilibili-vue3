<template>
    <card
        :title="title ? title : data?.title"
        :link="link ? link : data?.uri"
        :is-mask-show="isMaskShow"
        :image-url="cover ? cover : data?.pic"
        @playerenter="playerenter"
        @playerleave="playerleave"
    >
        <template #title-icon v-if="data?.is_ad_loc">
            <ad-icon />
        </template>
        <template #statsLeft-first v-if="data?.owner">
            <span class="iconfont stats-icon">&#xe612;</span>
            <span>
                <slot name="view" :view="data?.stat.view">{{
                    data?.stat.view
                }}</slot>
            </span>
        </template>
        <template #statsLeft-second v-if="data?.owner">
            <span class="iconfont stats-icon">&#xe67a;</span>
            <span>
                <slot name="like" :like="data?.stat.like">{{
                    data?.stat.like
                }}</slot>
            </span>
        </template>
        <template #statsRight v-if="data?.owner.face">
            <slot name="duration" :duration="data?.duration">{{
                data?.duration
            }}</slot>
        </template>
        <template #avatar v-if="data?.owner.face">
            <a :href="mid" class="card__wrap-avatar" target="_blank">
                <img
                    :src="data?.owner.face + '@72w_72h.webp'"
                    class="avatar"
                />
            </a>
        </template>
        <template #infoBottom>
            <a :href="mid" target="_blank" class="author info-small">{{
                data?.owner.name
            }}</a>
        </template>
        <template #video v-if="isMaskShow && isBuildPlayer">
            <div class="player" v-show="playerShow">
                <video
                    ref="player"
                    :src="videoUrl"
                    muted="true"
                    autoplay
                    poster="../../assets/loading.gif"
                ></video>
            </div>
        </template>
    </card>
</template>

<script setup lang="ts">
import Card from './Card.vue'
import AdIcon from './ADIcon.vue'
import { computed, nextTick, ref } from 'vue'
import { host } from '../../api/urlConfig'

const playerShow = ref(false)
const isBuildPlayer = ref(false)
const player = ref(null)

const { data } = defineProps({
    data: Object,
    title: {
        type: String,
        default: ''
    },
    cover: {
        type: String,
        default: ''
    },
    link: {
        type: String,
        default: ''
    },
    isMaskShow: {
        type: Boolean,
        default: true
    }
})

const videoUrl = computed(() => {
    const url = `${host}/video?cid=${data?.cid}&bvid=${data?.bvid}`
    return `${process.env.NODE_ENV === 'development' ? url : ''}`
})

const mid = computed(() => {
    return `https://space.bilibili.com/${data?.owner.mid}`
})

let timer: NodeJS.Timer

function canplaythrough(): void {
    playerShow.value = true
}

async function playerenter(): void {
    clearTimeout(timer)
    const delay = isBuildPlayer.value ? 500 : 300
    timer = setTimeout(async () => {
        if (!isBuildPlayer.value) {
            isBuildPlayer.value = true
            await nextTick()
            const playerElement: HTMLVideoElement = player.value
            playerElement.addEventListener('canplaythrough', canplaythrough)
        } else {
            playerShow.value = true
        }
    }, delay)
}

function playerleave(): void {
    clearTimeout(timer)
    playerShow.value = false
    if (player.value) {
        const playerElement: HTMLVideoElement = player.value
        playerElement.currentTime = 0
        playerElement.removeEventListener('canplaythrough', canplaythrough)
    }
}

</script>

<style lang="less" scoped>
.author {
    &:hover {
        color: @bili-blue;
    }
}
.stats-icon {
    font-size: 17px !important;
    padding-right: 3px !important;
}

.player {
    position: relative;
    height: 100%;
    background-color: #000;
    animation: show 0.3s ease;

    @keyframes show {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
}
</style>