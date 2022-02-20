<template>
    <div class="favorite-popover__content">
        <div class="popover__content-left">
            <switch-button
                v-if="favoriteFolders.length"
                :folders="favoriteFolders"
                @click="switchFavorite"
            />
        </div>
        <div class="popover__content-body scroll">
            <div class="favorite-container">
                <ul v-if="favorite && favorite.length" class="favorite-list">
                    <li
                        class="favorite-item"
                        v-for="item in favorite"
                        :key="item.id"
                        :title="item.title"
                        @click="open(item.bvid)"
                    >
                        <div class="left-box">
                            <div class="cover">
                                <img :src="item.cover" />
                            </div>
                            <span class="duration-tag">
                                {{ item.page > 1 ? item.page + 'P' : formatTime(item.duration) }}
                            </span>
                        </div>
                        <div class="right-box">
                            <div class="title">
                                <p>{{ item.title }}</p>
                            </div>
                            <div class="author">
                                <span class="info-small">{{ item.upper.name }}</span>
                            </div>
                        </div>
                    </li>
                </ul>
                <div v-else class="no-favorite">
                    <p class="message info-small">该收藏夹还没有视频哦~</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import SwitchButton from './SwitchButton.vue'
import { ref } from '@vue/reactivity'
import { formatTime } from '../../../../utils'
import { favoriteFolderApi, favoriteApi } from '../../../../api'

const favoriteFolders = ref([])
const favorite = ref([])

favoriteFolderApi().then(res => {
    favoriteFolders.value = res.data

    return favoriteApi(favoriteFolders.value[0].mediaListResponse.list[0].id)
}).then(res => {
    favorite.value = res.data
})

function switchFavorite(id): void {
    favoriteApi(id).then(res => {
        favorite.value = res.data
    })
}

function open(bvid): void {
    window.open('https://www.bilibili.com/video/' + bvid)
}
</script>

<style lang="less" scoped>
.favorite-popover__content {
    display: flex;
    height: 450px;

    .popover__content-left {
        width: 150px;
        height: 100%;
        border-right: 1px solid @gray1;
    }

    .popover__content-body {
        flex: 1;
        width: 370px;
        max-height: 450px;
        padding: 11px 0;
        color: @text1;

        .favorite-container {
            height: 100%;

            .no-favorite {
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100%;
            }

            .favorite-list {
                .favorite-item {
                    display: flex;
                    padding: 8px 5px 8px 20px;
                    cursor: pointer;
                    transition: background-color 0.2s;

                    &:hover {
                        background-color: #f4f4f4;
                    }

                    .left-box {
                        height: 100%;
                        position: relative;

                        .cover {
                            width: 108px;
                            height: 60px;
                        }
                        
                        .duration-tag {
                            position: absolute;
                            right: 4px;
                            bottom: 4px;
                            padding: 0 2px;
                            font-size: 12px;
                            color: #fff;
                            background-color: #0000008a;
                        }
                    }

                    .right-box {
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                        margin-left: 12px;

                        .title {
                            font-size: 14px;
                            margin: 0;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            display: -webkit-box;
                            -webkit-line-clamp: 2;
                            -webkit-box-orient: vertical;
                            word-break: break-all;
                        }

                        .author {
                            font-size: 12px;
                        }
                    }
                }
            }
        }
    }
}
</style>