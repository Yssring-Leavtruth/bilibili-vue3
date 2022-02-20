<template>
    <teleport to="body">
        <div
            class="qrcode-login"
            :class="leave ? 'qrcode-leave' : 'qrcode-enter'"
            @animationend="animationend"
        >
            <div class="title-line">
                <span>登录</span>
            </div>
            <main>
                <div class="qrcode-login_wrap">
                    <div class="qrcode-con">
                        <div class="qrcode-box">
                            <canvas
                                v-if="url.length"
                                width="140"
                                height="140"
                                v-qrcode-directive="url"
                            ></canvas>
                        </div>
                    </div>
                    <div class="qrcode-footer">
                        <p class="status-text">扫描二维码登录</p>
                    </div>
                </div>
            </main>
        </div>
        <div class="mask" @click="close"></div>
    </teleport>
</template>

<script setup lang="ts">
import { ref } from '@vue/reactivity'
import { Directive, DirectiveBinding, onBeforeUnmount, onMounted } from '@vue/runtime-core'
import { getLoginUrlApi, getLoginInfoApi } from '../../api'
import QRCode from 'qrcode'

const leave = ref(false)
const url = ref('')
const oauthKey = ref('')
const ts = ref(0)

const vQrcodeDirective: Directive = {
    beforeMount: (el: HTMLElement, binding) => {
        QRCode.toCanvas(el, binding.value, {
            width: 160
        })
    },
    beforeUpdate: (el: HTMLElement, binding) => {
        QRCode.toCanvas(el, binding.value, {
            width: 160
        })
    }
}

const emit = defineEmits(['close'])

function close(): void {
    leave.value = true
}

function animationend(): void {
    if (leave.value) {
        emit('close')
    }
}

let timer: NodeJS.Timer
let count = 0

onMounted(() => {
    getLoginUrlApi().then(res => {
        ts.value = res.ts * 1000 + 150 * 1000
        url.value = res.data.url
        oauthKey.value = res.data.oauthKey

        timer = setInterval(() => {
            if (Date.now() >= ts.value) {
                clearInterval(timer)
                return
            }
            getLoginInfoApi(oauthKey.value).then(res => {
                if (res.status) {
                    location.reload()
                }
            })
        }, 1000)
    })
})

onBeforeUnmount(() => {
    clearInterval(timer)
})
</script>

<style lang="less" scoped>
.mask {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 998;
    width: 100%;
    height: 100%;
    background-color: #121212;
    opacity: 0.65;
}

@keyframes show {
    from {
        opacity: 0;
        transform: translate(-50%, -20px);
    }
    to {
        opacity: 1;
        transform: translate(-50%, 0);
    }
}

@keyframes hide {
    from {
        opacity: 1;
        transform: translate(-50%, 0);
    }
    to {
        opacity: 0;
        transform: translate(-50%, -20px);
    }
}

.qrcode-login {
    position: fixed;
    top: 200px;
    left: 50%;
    width: 350px;
    transform: translateX(-50%);
    z-index: 999;
    background-color: #fff;
    border-radius: 6px;

    &.qrcode-enter {
        animation: show 0.3s ease;
    }

    &.qrcode-leave {
        animation: hide 0.2s ease-out;
    }

    .title-line {
        width: 280px;
        height: 28px;
        margin: 0 auto;
        border-bottom: 1px solid #ddd;
        margin-bottom: 28px;
        text-align: center;

        span {
            font-size: 32px;
            height: 56px;
            line-height: 56px;
            margin: 0 auto;
            padding: 0 20px;
            background: #fff;
            text-align: center;
        }
    }

    main {
        display: flex;
        justify-content: center;

        .qrcode-login_wrap {
            width: 480px;

            .qrcode-con {
                display: flex;
                justify-content: center;
                padding-top: 50px;

                .qrcode-box {
                    width: 160px;
                    height: 160px;
                    background-color: @gray1;
                }
            }

            .qrcode-footer {
                width: 100%;
                height: 155px;
                background: url(//s1.hdslb.com/bfs/static/passport/static/img/2233login.af9c53d.png)
                    no-repeat center;
                background-size: 100%;

                .status-text {
                    padding-top: 10px;
                    text-align: center;
                    color: #222;
                    font-size: 18px;
                    letter-spacing: 2px;
                    margin-bottom: 5px;
                }
            }
        }
    }
}
</style>