<template>
    <div class="search-box" :class="{ isFocus }">
        <form
            class="search-from"
            :class="{ isFocus }"
            ref="searchFrom"
            @submit.prevent
            @keypress.enter="search"
        >
            <input
                class="search-from__input"
                type="text"
                autocomplete="off"
                :placeholder="searchDefault ? searchDefault.show_name : '搜索'"
                v-model="searchValue"
                @focus="focus"
                @input="input"
            />
            <div class="search-btn" @click="search">
                <svg
                    width="17"
                    height="17"
                    viewBox="0 0 17 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M16.3451 15.2003C16.6377 15.4915 16.4752 15.772 16.1934 16.0632C16.15 16.1279 16.0958 16.1818 16.0525 16.2249C15.7707 16.473 15.4456 16.624 15.1854 16.3652L11.6848 12.8815C10.4709 13.8198 8.97529 14.3267 7.44714 14.3267C3.62134 14.3267 0.5 11.2314 0.5 7.41337C0.5 3.60616 3.6105 0.5 7.44714 0.5C11.2729 0.5 14.3943 3.59538 14.3943 7.41337C14.3943 8.98802 13.8524 10.5087 12.8661 11.7383L16.3451 15.2003ZM2.13647 7.4026C2.13647 10.3146 4.52083 12.6766 7.43624 12.6766C10.3517 12.6766 12.736 10.3146 12.736 7.4026C12.736 4.49058 10.3517 2.1286 7.43624 2.1286C4.50999 2.1286 2.13647 4.50136 2.13647 7.4026Z"
                        fill="currentColor"
                    ></path>
                </svg>
            </div>
        </form>
        <div class="search-panel" v-show="isFocus" ref="searchPanel">
            <div class="history" v-if="!suggestShow && histories.length">
                <div class="header">
                    <div class="title">搜索历史</div>
                    <button class="clear" @click.stop="clearHistories">清空</button>
                </div>
                <div class="histories-wrap">
                    <div class="histories">
                        <div
                            class="history-item"
                            v-for="(item, i) in histories"
                            @click.self="search(item.value)"
                        >
                            <span class="item-title">{{ item.value }}</span>
                            <span
                                class="item-close"
                                @click="deleteHsitory(i)"
                            ></span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="trending" v-if="!suggestShow">
                <div class="header">
                    <h3 class="title">热搜</h3>
                </div>
                <div class="trendings-double" v-if="searchTrending.length">
                    <div class="trendings-col">
                        <div
                            class="trendings-item"
                            v-for="i in 5"
                            :title="searchTrending[i - 1].show_name"
                            @click="search(searchTrending[i - 1].keyword)"
                        >
                            <span
                                class="trendings-rank"
                                :class="{ 'rank-top': i < 4 }"
                                >{{ i }}</span
                            >
                            <span class="trendings-title">{{
                                searchTrending[i - 1].show_name
                            }}</span>
                            <img
                                class="trendings-icon"
                                v-if="searchTrending[i - 1].icon"
                                :src="searchTrending[i - 1].icon"
                            />
                        </div>
                    </div>
                    <div class="trendings-col">
                        <div
                            class="trendings-item"
                            v-for="i in 5"
                            :title="searchTrending[i + 4].show_name"
                            @click="search(searchTrending[i + 4].keyword)"
                        >
                            <span class="trendings-rank">{{ i + 5 }}</span>
                            <span class="trendings-title">{{
                                searchTrending[i + 4].show_name
                            }}</span>
                            <img
                                class="trendings-icon"
                                v-if="searchTrending[i + 4].icon"
                                :src="searchTrending[i + 4].icon"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div class="suggestions" v-if="suggestShow">
                <div
                    class="suggest-item"
                    v-for="i in suggestions"
                    v-html="i.name"
                    @click="search(i.value)"
                ></div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "@vue/reactivity"
import { onMounted, onUnmounted } from "@vue/runtime-core"
import { SwipeDirection } from "@vueuse/core"
import { searchDefaultApi, searchTrendingApi, searchApi } from '../../api'

const isFocus = ref(false)
const searchFrom = ref(null)
const searchPanel = ref(null)
const searchDefault = ref({})
const searchTrending = ref([])
const searchValue = ref('')
const suggestShow = ref(false)
const suggestions = ref([])
const histories = ref([])

if (JSON.parse(localStorage.getItem("search_history"))) {
    histories.value = JSON.parse(localStorage.getItem("search_history"))
} else {
    localStorage.setItem("search_history", JSON.stringify([]))
}

searchDefaultApi().then(res => {
    searchDefault.value = res
})

function input(): void {
    if (searchValue.value.length) {
        searchApi(searchValue.value).then(res => {
            if (searchValue.value) {
                suggestions.value = res.result.tag
                suggestShow.value = true
            }
        })
    } else {
        suggestions.value = []
        suggestShow.value = false
    }
}

function focus(): void {
    isFocus.value = true
    if (!searchTrending.value.length) {
        searchTrendingApi().then(res => {
            searchTrending.value = res.trending.list
        })
    }
}

function clearHistories() {
    histories.value = []
    localStorage.setItem("search_history", JSON.stringify([]))
}

function deleteHsitory(index) {
    console.log(histories.value.splice(index, 1))
}

function search(keyword?: string): void {
    if (!(keyword instanceof Event) && keyword) {
        searchValue.value = keyword
        suggestShow.value = false
    }
    if (searchValue.value) {
        const index = histories.value.findIndex((item, i) => item.value == searchValue.value)
        if (index !== -1) {
            deleteHsitory(index)
        }

        histories.value.unshift({ value: searchValue.value })
        localStorage.setItem("search_history", JSON.stringify(histories.value))

        window.open('https://search.bilibili.com/all?keyword=' + searchValue.value)
    } else {
        window.open(searchDefault.value.url)
    }
}

function panelLeave(e: Event) {
    if (searchFrom.value.contains(e.target) || searchPanel.value.contains(e.target)) {
        return
    }
    isFocus.value = false
}

onMounted(() => {
    document.addEventListener('click', panelLeave)
})

onUnmounted(() => {
    document.removeEventListener('click', panelLeave)
})
</script>


<style lang="less">
.search-box {
    border-radius: 8px;

    &.isFocus {
        box-shadow: 0 0 30px #0000001a;
    }

    .isFocus {
        border-bottom: 0 !important;
        border-radius: 8px 8px 0 0 !important;
        background-color: #fff !important;
        opacity: 1 !important;
    }

    .search-panel {
        width: 100%;
        max-height: 612px;
        overflow-y: auto;
        background: #fff;
        border: 1px solid @gray1;
        border-top: none;
        border-radius: 0 0 8px 8px;
        padding: 13px 0 16px;
        -webkit-font-smoothing: antialiased;

        @media screen and (max-width: 1500px) {
            .trendings-double {
                flex-direction: column !important;

                .trendings-col {
                    width: 100% !important;
                }
            }
        }

        .header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 16px;

            .title {
                font-size: 16px;
                font-weight: normal;
            }
        }

        .history {
            .clear {
                font-size: 12px;
                color: @gray2;

                &:hover {
                    color: @bili-blue;
                }
            }

            .histories-wrap {
                max-height: 170px;
                overflow: hidden;
                padding: 0 16px;

                .histories {
                    display: flex;
                    flex-wrap: wrap;
                    margin-top: 12px;
                    margin-right: -10px;
                    margin-bottom: 4px;

                    .history-item {
                        position: relative;
                        box-sizing: border-box;
                        height: 30px;
                        padding: 7px 10px 8px;
                        font-size: 12px;
                        line-height: 15px;
                        color: @gray3;
                        background: #f6f7f8;
                        border-radius: 4px;
                        margin-right: 10px;
                        margin-bottom: 10px;
                        cursor: pointer;

                        &:hover {
                            color: @bili-blue;

                            .item-close {
                                display: block;
                            }
                        }

                        .item-title {
                            pointer-events: none;
                        }

                        .item-close {
                            display: none;
                            position: absolute;
                            top: -3px;
                            right: -3px;
                            width: 11px;
                            height: 11px;
                            border-radius: 50%;
                            background-color: #ccc;

                            &:after {
                                content: "";
                                position: absolute;
                                top: 2px;
                                left: 5px;
                                width: 1px;
                                height: 7px;
                                transform: rotate(-45deg);
                                background-color: #fff;
                            }

                            &:before {
                                content: "";
                                position: absolute;
                                top: 2px;
                                left: 5px;
                                width: 1px;
                                height: 7px;
                                transform: rotate(45deg);
                                background-color: #fff;
                            }
                        }
                    }
                }
            }
        }

        .trending {
            .trendings-double {
                display: flex;

                .trendings-col {
                    width: 50%;
                    margin-right: 10px;

                    .trendings-item {
                        height: 38px;
                        display: flex;
                        align-items: center;
                        cursor: pointer;
                        padding-left: 16px;

                        &:hover {
                            background-color: @gray1;
                        }

                        .rank-top {
                            color: @text1 !important;
                        }

                        .trendings-rank {
                            width: 15px;
                            min-width: 15px;
                            height: 17px;
                            line-height: 17px;
                            text-align: center;
                            font-size: 14px;
                            margin-right: 7px;
                            color: #9499a0;
                        }

                        .trendings-title {
                            font-size: 14px;
                            line-height: 17px;
                            height: 17px;
                            margin-right: 6px;
                            white-space: nowrap;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            letter-spacing: 0;
                        }

                        .trendings-icon {
                            height: 14px;
                            width: inherit;
                            margin-right: 16px;
                        }
                    }
                }
            }
        }

        .suggestions {
            margin-top: -6px;
            margin-bottom: -6px;

            .suggest-item {
                height: 32px;
                display: block;
                line-height: 32px;
                font-size: 14px;
                position: relative;
                text-align: left;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
                cursor: pointer;
                padding: 0 16px;
                margin-bottom: 4px;

                &:hover {
                    background-color: @gray1;
                }

                .suggest_high_light {
                    color: #f25d8e;
                    font-style: normal;
                }
            }
        }
    }

    .search-from {
        display: block;
        padding: 0 48px 0 4px;
        position: relative;
        z-index: 1;
        overflow: hidden;
        line-height: 38px;
        border: 1px solid @gray1;
        border-radius: 8px;
        background-color: #f1f2f3;
        opacity: 0.9;
        overflow: hidden;
        height: 40px;
        transition: background-color .2s;

        &:hover {
            opacity: 1;
            background-color: #fff;
        }

        &::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
        }

        .search-from__input {
            overflow: hidden;
            padding-left: 8px;
            width: 100%;
            height: 32px;
            border: 2px solid transparent;
            border-radius: 6px;
            background-color: transparent;
            box-shadow: none;
            color: @gray3;
            font-size: 14px;
            line-height: 20px;

            &:focus {
                background-color: @gray1;
            }
        }

        .search-btn {
            position: absolute;
            top: 4px;
            right: 7px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0;
            padding: 0;
            width: 32px;
            height: 32px;
            border: none;
            border-radius: 6px;
            color: @text1;
            line-height: 32px;
            cursor: pointer;
            transition: background-color 0.3s;

            &:hover {
                background-color: @gray1;
            }
        }
    }
}
</style>