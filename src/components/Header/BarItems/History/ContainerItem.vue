<template>
    <li class="history-item">
        <div class="item-card">
            <div class="left-box">
                <div class="cover">
                    <div class="badge">
                        <slot></slot>
                    </div>
                    <div class="bar" v-if="progress != -1">
                        <div class="progress" :style="`width:${progress}%`"></div>
                    </div>
                    <img :src="cover" />
                </div>
            </div>
            <div class="right-box">
                <div class="card-title" :style="`--line-count:${showTitle ? 1 : 2};`">
                    <p>{{ title }}</p>
                </div>
                <div class="show-title">
                    <p>{{ showTitle }}</p>
                </div>
                <div class="card-info">
                    <span class="date">{{ date }}</span>
                    <span class="author">{{ name }}</span>
                </div>
            </div>
        </div>
    </li>
</template>

<script setup lang="ts">

defineProps({
    title: String,
    name: String,
    cover: String,
    date: String,
    showTitle: String,
    progress: {
        type: Number,
        default: -1
    }
})
</script>

<style lang="less" scoped>
.history-item {
    padding: 8px 5px 8px 20px;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
        background-color: #f4f4f4;
    }

    .item-card {
        display: flex;

        .left-box {
            position: relative;

            .badge {
                position: absolute;
                top: 2px;
                right: 4px;
            }

            .bar {
                position: absolute;
                bottom: 0;
                left: 0;
                height: 3px;
                width: 100%;
                background-color: #757575;

                .progress {
                    height: 100%;
                    background-color: #FB7299;
                }
            }

            .cover {
                display: flex;
                justify-content: space-evenly;
                width: 108px;
                height: 60px;
                overflow: hidden;
            }
        }
        .right-box {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            margin-left: 12px;
            padding-right: 10px;

            .card-title {
                p {
                    display: -webkit-box;
                    font-size: 14px;
                    overflow: hidden;
                    -webkit-box-orient: vertical;
                    text-overflow: ellipsis;
                    word-break: break-all;
                    -webkit-line-clamp: var(--line-count, 2);
                }
            }

            .show-title {
                p {
                    display: -webkit-box;
                    color: @gray3;
                    font-size: 12px;
                    overflow: hidden;
                    -webkit-box-orient: vertical;
                    text-overflow: ellipsis;
                    word-break: break-all;
                    -webkit-line-clamp: 1;
                }
            }

            .card-info {
                display: flex;
                font-size: 12px;
                color: #999;

                .date {
                    margin-right: 16px;
                }
            }
        }
    }
}
</style>