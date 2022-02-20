<template>
    <div class="login-popover__content">
        <div class="register">
            <span class="register-info">首次使用？</span>
            <a
                href="https://passport.bilibili.com/register/phone.html"
                class="register-link"
                >点击注册</a
            >
        </div>
        <button class="border-button login-btn" @click="click">
            立即登录
        </button>
    </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['loginExpansion'])

function click(): void {
    emit('loginExpansion')
}

</script>

<style lang="less" scoped>
.login-popover__content {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    width: 200px;
    height: 90px;

    .register {
        margin-top: 10px;
        font-size: 14px;

        .register-link {
            color: @bili-blue;
        }
    }

    .login-btn {
        color: #fff;
        font-size: 14px;
        width: 90%;
        height: 40px;
        // margin-bottom: 10px;
        background-color: @bili-blue;

        &:hover {
            color: #fff;
            background-color: #00b5e5;
        }
    }
}
</style>