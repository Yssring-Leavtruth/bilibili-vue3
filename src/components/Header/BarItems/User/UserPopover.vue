<template>
    <div class="user-popover">
        <!-- 用户头像 -->
        <div class="entry-userInfo">
            <a
                href="https://space.bilibili.com/"
                class="avatar-box"
                :class="{ 'no-pendant': !userInfo.pendant.image }"
            >
                <img class="avatar" :src="userInfo.face" />
                <img
                    class="pendant"
                    :src="userInfo.pendant.image"
                    v-if="userInfo.pendant.image"
                />
            </a>
            <div class="uname">
                <span>{{ userInfo.uname }}</span>
            </div>
        </div>

        <!-- 等级条 -->
        <div class="level-content">
            <div class="level-info">
                <span class="grade">{{ grade }}</span>
                <span class="progress">{{ progress }}</span>
            </div>
            <a
                href="https://account.bilibili.com/account/record?type=exp"
                class="level-link"
            >
                <div class="level-bar">
                    <div
                        class="level-progress"
                        :style="`width:${progressBar}%`"
                    ></div>
                </div>
            </a>
        </div>

        <!-- 硬币和B币 -->
        <div class="coins">
            <div class="coins-container">
                <div class="info">
                    <a
                        href="https://account.bilibili.com/account/coin"
                        class="money"
                    >
                        <i class="iconfont coins-icon">&#xe603;</i>
                        <span>{{ userInfo.money }}</span>
                    </a>
                </div>
            </div>
        </div>

        <!-- 粉丝和关注 -->
        <div class="counts" v-if="stat">
            <a
                href="https://space.bilibili.com/13695554/fans/follow"
                class="count-item"
            >
                <span class="item-key">关注</span>
                <span class="item-value">{{ stat.following }}</span>
            </a>
            <a
                href="https://space.bilibili.com/13695554/fans/fans"
                class="count-item"
            >
                <span class="item-key">粉丝</span>
                <span class="item-value">{{ stat.follower }}</span>
            </a>
            <a
                href="https://space.bilibili.com/13695554/dynamic"
                class="count-item"
            >
                <span class="item-key">动态</span>
                <span class="item-value">{{ stat.dynamic_count }}</span>
            </a>
        </div>

        <!-- 个人中心 -->
        <div class="links">
            <a
                href="https://account.bilibili.com/account/home"
                class="link-item"
            >
                <i class="iconfont item-icon">&#xe608;</i>
                <span class="item-title">个人中心</span>
            </a>
            <a
                href="https://member.bilibili.com/platform/upload-manager/article"
                class="link-item"
            >
                <i class="iconfont item-icon">&#xe7d1;</i>
                <span class="item-title">投稿管理</span>
            </a>
            <a
                href="https://pay.bilibili.com/pay-v2-web/bcoin_index"
                class="link-item"
            >
                <i class="iconfont item-icon">&#xe6ad;</i>
                <span class="item-title">B币钱包</span>
            </a>
            <a href="https://show.bilibili.com/orderlist" class="link-item">
                <i class="iconfont item-icon">&#xe64e;</i>
                <span class="item-title">订单中心</span>
            </a>
            <a
                href="https://link.bilibili.com/p/center/index"
                class="link-item"
            >
                <i class="iconfont item-icon">&#xe80b;</i>
                <span class="item-title">直播中心</span>
            </a>
            <a
                href="https://www.bilibili.com/cheese/mine/list"
                class="link-item"
            >
                <i class="iconfont item-icon">&#xe61a;</i>
                <span class="item-title">我的课程</span>
            </a>
        </div>

        <!-- 退出登录 -->
        <div class="logout">
            <div class="logout-item" @click="logout">
                <i class="iconfont item-icon">&#xe569;</i>
                <span class="item-title">退出</span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, inject, ref } from "@vue/runtime-core"
import { statApi, logoutApi } from '../../../../api'

const userInfo = inject('userInfo')
const stat = ref(null)

const grade = computed(() => {
    return '等级 ' + userInfo.value.level_info.current_level
})

const progress = computed(() => {
    return userInfo.value.level_info.current_exp + ' / ' + userInfo.value.level_info.next_exp
})

const progressBar = computed(() => {
    const current_exp = userInfo.value.level_info.current_exp
    const next_exp = userInfo.value.level_info.next_exp
    return Math.floor((current_exp / next_exp) * 100)
})

function logout(): void {
    logoutApi().then(res => location.reload())
}

statApi().then(res => {
    stat.value = res.data
})
</script>

<style lang="less" scoped>
.user-popover {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 280px;

    .entry-userInfo {
        display: flex;
        flex-direction: column;
        align-items: center;
        z-index: 1;
        animation: none !important;
        // margin-right: 20px;

        .avatar-box {
            display: flex;
            justify-content: space-evenly;
            align-items: center;
            position: relative;
            top: -45px;
            width: 90px;
            height: 90px;
            overflow: hidden;
            transition: all 0.2s;

            &.no-pendant {
                width: 80px;
                height: 80px;
                top: -40px;

                .avatar {
                    width: 100%;
                    height: 100%;
                }
            }

            .avatar {
                width: 50px;
                height: 50px;
                border-radius: 50%;
            }

            .pendant {
                position: absolute;
                width: 90px;
                height: initial;
            }
        }

        .uname {
            position: absolute;
            top: 45px;
            color: @text2;
            font-weight: 600;
            text-align: center;
            font-size: 16px;
        }
    }

    .level-content {
        display: flex;
        flex-direction: column;
        width: 100%;
        padding: 0 20px;

        .level-info {
            display: flex;
            align-items: center;
            flex: 1;
            justify-content: space-between;
            margin-bottom: 5px;

            .grade {
                font-size: 14px;
            }

            .progress {
                color: @gray2;
                font-weight: 400;
                font-size: 12px;
            }
        }

        .level-link {
            display: flex;
            align-items: center;
            height: 10px;

            .level-bar {
                flex: 1;
                height: 2px;
                background-color: #f4f4f4;

                .level-progress {
                    height: 100%;
                    background-color: #f3cb85;
                }
            }
        }
    }

    .coins {
        width: 100%;
        padding: 14px 20px;
        border-bottom: 1px solid @gray1;

        .coins-container {
            .info {
                .money {
                    display: flex;
                    align-items: center;

                    .coins-icon {
                        font-size: 20px;
                        color: @bili-blue;
                    }

                    span {
                        margin: 0 20px 0 8px;
                        font-size: 13px;

                        &:hover {
                            color: @bili-blue;
                        }
                    }
                }
            }
        }
    }

    .counts {
        display: flex;
        justify-content: space-evenly;
        width: 100%;
        height: 58px;
        border-bottom: 1px solid @gray1;

        .count-item {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            &:hover {
                .item-key,
                .item-value {
                    color: @bili-blue;
                }
            }

            .item-key {
                font-size: 12px;
                color: @gray2;
            }

            .item-value {
                font-weight: 600;
            }
        }
    }

    .links {
        width: 100%;
        padding: 7px 0;
        border-bottom: 1px solid @gray1;

        .link-item {
            display: flex;
            align-items: center;
            height: 46px;
            width: 100%;
            padding: 8px 23px 8px 23px;
            transition: all 0.3s;

            &:hover {
                background-color: #f4f4f4;
            }

            .item-icon {
                font-size: 18px;
                color: @gray2;
                margin-right: 5px;
            }

            .item-title {
                font-size: 14px;
            }
        }
    }

    .logout {
        width: 100%;
        padding: 7px 0;

        .logout-item {
            display: flex;
            align-items: center;
            height: 46px;
            width: 100%;
            padding: 8px 23px 8px 23px;
            cursor: pointer;
            transition: all 0.3s;

            &:hover {
                background-color: #f4f4f4;
            }

            .item-icon {
                font-size: 18px;
                color: @gray2;
                margin-right: 5px;
            }

            .item-title {
                font-size: 14px;
            }
        }
    }
}
</style>