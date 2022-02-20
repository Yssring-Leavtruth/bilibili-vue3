<template>
    <div class="card">
        <div class="card__skeleton">
            <div class="card__skeleton-cover"></div>
            <div class="card__skeleton-info" v-if="isInfoShow">
                <p class="card__skeleton-title">
                    <span></span>
                    <span></span>
                </p>
            </div>
        </div>
        <div class="card__wrap" v-if="title">
            <div class="card__wrap-video" @mouseenter="playerenter" @mouseleave="playerleave">
                <a :href="link" target="_blank">
                    <div
                        class="card__wrap-mask"
                        v-if="isMaskShow"
                        :style="`--mask-fixate:${maskFixate ? 1 : 0}`"
                    >
                        <div class="card__wrap-stats">
                            <div class="stats-left">
                                <span class="stats-item">
                                    <slot name="statsLeft-first"></slot>
                                </span>
                                <span class="stats-item">
                                    <slot name="statsLeft-second"></slot>
                                </span>
                            </div>
                            <div class="stats-right">
                                <span class="stats-item">
                                    <slot name="statsRight"></slot>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="card__wrap-cover">
                        <img :src="imageUrl + '@672w_378h_1c_100q.webp'" />
                    </div>
                </a>
                <div class="card__wrap-video-player">
                    <slot name="video"></slot>
                </div>
            </div>
            <div class="card__wrap-info" v-if="isInfoShow">
                <slot name="avatar"></slot>
                <div class="card-info-right">
                    <a :href="link" class="card-title" target="_blank">
                        <h3 :title="title">
                            <slot name="title-icon"></slot>
                            <span
                                :class="{
                                    title,
                                    'linkage-title': highlightLinkage,
                                }"
                                >{{ title }}</span
                            >
                        </h3>
                    </a>
                    <p class="card-author">
                        <slot name="infoBottom"></slot>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps({
    title: String,
    link: String,
    imageUrl: String,
    isInfoShow: {
        type: Boolean,
        default: true
    },
    isMaskShow: {
        type: Boolean,
        default: true
    },
    highlightLinkage: {
        type: Boolean,
        default: false
    },
    maskFixate: {
        type: Boolean,
        default: false
    }
})

const emit = defineEmits(['playerenter', 'playerleave'])

function playerenter(): void {
    emit('playerenter')
}

function playerleave(): void {
    emit('playerleave')
}

</script>

<style lang="less">
img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: inherit;
}

.card {
    position: relative;
    border-radius: 6px;

    &:hover .linkage-title {
        color: @bili-blue !important;
    }

    .card__skeleton {
        .card__skeleton-cover {
            padding-top: 56.25%;
            background-color: @gray1;
            border-radius: 6px;
        }

        .card__skeleton-info {
            margin-top: 10px;
            height: 64px;

            .card__skeleton-title {
                span {
                    display: inline-block;
                    height: 10px;
                    border-radius: 3px;
                    background-color: @gray1;

                    &:first-child {
                        width: 80%;
                    }

                    &:last-child {
                        width: 50%;
                    }
                }
            }
        }
    }

    .card__wrap {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        background-color: #fff;

        .card__wrap-video {
            position: relative;
            border-radius: 6px;
            overflow: hidden;

            .card__wrap-video-player {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
            }

            a {
                padding-top: 56.25%;
                display: block;
            }

            &:hover {
                .card__wrap-mask {
                    opacity: var(--mask-fixate);
                }
            }

            .card__wrap-mask {
                position: absolute;
                z-index: 2;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-image: linear-gradient(
                    to bottom,
                    rgba(0, 0, 0, 0) 80%,
                    rgba(37, 37, 37, 0.6)
                );
                transition: opacity 0.5s;

                .card__wrap-stats {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    position: absolute;
                    z-index: 3;
                    left: 0;
                    bottom: 0;
                    padding: 16px 8px 6px;
                    width: 100%;
                    height: 38px;

                    * {
                        color: #fff !important;
                        font-size: 13px;
                        font-weight: 400;
                    }

                    .stats-left {
                        display: flex;

                        .stats-item {
                            display: flex;
                            margin-right: 12px;
                        }
                    }
                }
            }

            .card__wrap-cover {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                object-fit: contain;

                img {
                    height: initial;
                }
            }
        }

        .card__wrap-info {
            margin-top: 10px;
            display: flex;
            justify-content: flex-start;
            height: 64px;

            .card-info-right {
                max-height: 40px;

                .card-title {
                    height: 100%;

                    * {
                        color: @text1;
                        font-size: 15px;
                        font-weight: 500;
                    }

                    h3 {
                        display: -webkit-box;
                        overflow: hidden;
                        -webkit-box-orient: vertical;
                        text-overflow: ellipsis;
                        word-break: break-word !important;
                        line-break: anywhere;
                        -webkit-line-clamp: 2;
                        padding-right: 24px;
                        transition: color 0.3s;

                        &:hover .title {
                            color: @bili-blue !important;
                        }
                    }
                }

                .card-author {
                    margin-top: 4px;
                }

                a * {
                    transition: color 0.3s;
                }
            }
        }
    }
}
</style>
