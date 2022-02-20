<template>
    <div class="login">
        <div class="top-banner">
            <img
                src="//s1.hdslb.com/bfs/static/passport/static/img/rl_top.35edfde.png"
            />
        </div>
        <div class="title-line">
            <span>登录</span>
        </div>
        <main>
            <div class="login-box">
                <div class="qrcode-con">
                    <div class="qrcode-box">
                        <canvas
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
</template>

<script setup lang="ts">
import { ref } from '@vue/reactivity'
import QRCode from 'qrcode'

const url = ref('https://passport.bilibili.com/qrcode/h5/login?oauthKey=e3d6f58d25a93c1ec030048f3fe62ff8')

const vQrcodeDirective = {
    beforeMount: (el: HTMLElement, binding) => {
        QRCode.toCanvas(el, binding.value, {
            width: 160
        })
    }
}
</script>

<style lang="less" scoped>
.login {
    .top-banner {
        position: relative;
        background: #00a0d8;
        height: 86px;
        text-align: center;
        margin-bottom: 20px;

        img {
            position: absolute;
            top: 0;
            left: 50%;
            width: initial;
            height: initial;
            transform: translateX(-50%);
        }
    }

    .title-line {
        width: 980px;
        height: 28px;
        margin: 0 auto;
        border-bottom: 1px solid #ddd;
        margin-bottom: 28px;
        text-align: center;

        span {
            font-size: 38px;
            height: 56px;
            line-height: 56px;
            margin: 0 auto;
            padding: 0 20px;
            font-size: 40px;
            background: #fff;
            text-align: center;
        }
    }

    main {
        display: flex;
        justify-content: center;

        .login-box {
            width: 480px;

            .qrcode-con {
                display: flex;
                justify-content: center;
                padding-top: 50px;
            }

            .qrcode-footer {
                width: 100%;
                height: 155px;
                background: url(//s1.hdslb.com/bfs/static/passport/static/img/2233login.af9c53d.png)
                    0 -7px no-repeat;

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