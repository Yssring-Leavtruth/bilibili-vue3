<template>
    <div class="header-channel">
        <div class="channel-icons">
            <a
                :href="item.link"
                target="_blank"
                class="icons-item"
                v-for="(item, i) in channel.icons"
                :key="item.title"
            >
                <div
                    class="icons-bg"
                    :style="`background-color:${item.bg_color}`"
                    v-html="item.svg"
                ></div>
                <span class="icons-title">{{ item.title }}</span>
            </a>
        </div>
        <div class="channel-items">
            <a
                :href="i.link"
                v-for="i in channel.items"
                :key="i.name"
                class="channel-link"
                target="_blank"
                >{{ i.name }}</a
            >
        </div>
    </div>
</template>

<script setup lang="ts">
import { Ref, ref } from "@vue/reactivity"
import { channelApi } from '../../api'

const channel = ref({})

channelApi().then((res) => {
    channel.value = res
});
</script>

<style lang="less">
.header-channel {
    display: flex;
    align-items: center;
    max-width: 2078px;
    min-width: 1100px;
    padding: 0 96px;
    height: 120px;

    .channel-icons {
        margin-right: 20px;
        display: flex;
        align-items: center;

        .icons-item {
            position: relative;
            display: flex;
            flex-direction: column;
            margin-right: 24px;

            .icons-bg {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 46px;
                height: 46px;
                background-color: rgb(255, 200, 200);
                margin-bottom: 6px;
                border-radius: 50%;
                transition: opacity 0.2s;

                &:hover {
                    opacity: 0.9;
                }

                svg {
                    width: 25px;
                    height: 25px;
                }
            }

            .icons-title {
                font-size: 14px;
                line-height: 20px;
                text-align: center;

                &:hover {
                    color: inherit !important;
                }
            }
        }
    }

    .channel-items {
        display: grid;
        position: relative;
        grid-template-columns: repeat(15, 1fr);
        grid-template-rows: repeat(2, 1fr);
        grid-auto-flow: column;
        grid-gap: 10px;
        width: 100%;

        .channel-link {
            display: inline-block;
            width: 100%;
            height: 30px;
            line-height: 30px;
            font-size: 14px;
            letter-spacing: 2px;
            color: @gray3;
            border: @border-color;
            border-radius: 6px;
            background-color: #f6f7f8;
            text-align: center;
            transition: background-color 0.3s, color 0.3s;
            box-sizing: content-box;
            font-weight: 400;
            cursor: pointer;

            &:hover {
                background-color: @gray1;
            }

            &:nth-of-type(1n + 31) {
                display: none !important;
            }
        }
    }
}

@media screen and (max-width: 1700px) {
    .channel-icons {
        margin-right: 8px !important;
    }

    .channel-items {
        grid-template-columns: repeat(12, 1fr) !important;

        .channel-link {
            font-size: 13px !important;
            height: 26px !important;
            line-height: 26px !important;

            &:nth-of-type(1n + 25) {
                display: none !important;
            }
        }
    }
}

@media screen and (max-width: 1350px) {
    .channel-icons {
        margin-right: 16px !important;

        .icons-item {
            margin-right: 16px !important;

            .icons-bg {
                width: 40px !important;
                height: 40px !important;
            }
        }
    }
}

@media screen and (max-width: 1100px) {
    .channel-icons {
        margin-right: 8px !important;

        .icons-item {
            margin-right: 10px !important;

            .icons-title {
                font-size: 13px !important;
                line-height: 18px !important;
            }
        }
    }

    .channel-items {
        grid-template-columns: repeat(11, 1fr) !important;

        .channel-link {
            font-size: 13px !important;
            height: 22px !important;
            line-height: 22px !important;

            &:nth-of-type(1n + 23) {
                display: none !important;
            }
        }
    }
}
</style>