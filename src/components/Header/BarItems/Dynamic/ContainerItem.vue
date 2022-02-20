<template>
    <li class="dynamic-item">
        <div class="item-card" :title="title">
            <div class="left-box">
                <a href="#" class="avatar-box">
                    <img class="avatar" :src="face" />
                    <span class="verify" v-if="verify && verify.type != -1">
                        <img :src="verify_card[verify.type]" />
                    </span>
                </a>
            </div>
            <div class="center-box">
                <a class="author">
                    <span class="author-name">{{ name }}</span>
                    <div class="author-stat">
                        <span class="publish-time">
                            <slot></slot>
                        </span>
                        <span class="is-live">
                            <slot name="live"></slot>
                        </span>
                    </div>
                </a>
                <div class="dynamic-title">
                    <p>{{ title }}</p>
                </div>
            </div>
            <div class="right-box">
                <div class="cover">
                    <img :src="cover" />
                </div>
            </div>
        </div>
    </li>
</template>

<script setup lang="ts">
const verify_card = [
    'https://s1.hdslb.com/bfs/static/blive/bpfe-dynamic-nav-iframe/static/img/verify_0.6e59734b.svg',
    'https://s1.hdslb.com/bfs/static/blive/bpfe-dynamic-nav-iframe/static/img/verify_1.d53e8b68.svg'
]

defineProps({
    title: String,
    name: String,
    face: String,
    cover: String,
    verify: Object
})
</script>

<style lang="less" scoped>
.dynamic-item {
    padding: 11px 18px;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
        background-color: #f4f4f4;
    }

    .item-card {
        display: flex;

        .left-box {
            width: 36px;

            .avatar-box {
                display: inline-block;
                position: relative;
                width: 36px;
                height: 36px;

                .avatar {
                    border-radius: 50%;
                }

                .verify {
                    position: absolute;
                    bottom: 0;
                    right: 0;
                    width: 15px;
                    height: 15px;
                    border-radius: 50%;
                    background-color: #fff;

                    img {
                        position: relative;
                        left: 2px;
                        width: 11px;
                        border-radius: 50%;
                    }
                }
            }
        }

        .center-box {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: flex-start;
            padding: 0 11px;

            .author {
                display: flex;
                font-size: 12px;

                .author-name {
                    color: @gray3;
                }

                .author-stat {
                    margin-left: 9px;

                    .publish-time {
                        color: @gray2;
                    }

                    .is-live {
                        color: #fb7299;
                    }
                }
            }

            .dynamic-title {
                font-size: 13.5px;
                margin-top: 5px;

                p {
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 3;
                    -webkit-box-orient: vertical;
                    word-break: break-all;
                }
            }
        }

        .right-box {
            display: flex;

            .cover {
                display: flex;
                justify-content: space-evenly;
                width: 60px;
                height: 35px;
                border-radius: 1px;
                overflow: hidden;

                img {
                    width: initial;
                }
            }
        }
    }
}
</style>