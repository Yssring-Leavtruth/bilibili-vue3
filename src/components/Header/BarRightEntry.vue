<template>
    <ul class="right-entry">
        <li class="entry-item" v-if="userInfo">
            <component :is="userInfo.isLogin ? User : Login" @login-show="loginExpansion"/>
        </li>
        <li class="entry-item">
            <dynamic/>
        </li>
        <li class="entry-item">
            <favorites/>
        </li>
        <li class="entry-item">
            <history/>
        </li>
        <li class="entry-item">
            <a class="entry-default" href="#"><span>创作中心</span></a>
        </li>
    </ul>
    <qrcode v-if="isLoginShow" @close="loginClose"/>
</template>

<script setup lang="ts">
import './barEntry.less'
import Qrcode from '../Qrcode/Qrcode.vue'
import Login from './BarItems/Login/Login.vue'
import User from './BarItems/User/User.vue'
import Dynamic from './BarItems/Dynamic/Dynamic.vue'
import Favorites from './BarItems/Favorites/Favorites.vue'
import History from './BarItems/History/History.vue'
import { navApi } from '../../api'
import { ref } from '@vue/reactivity'
import { provide } from '@vue/runtime-core'

const isLoginShow = ref(false)
const userInfo = ref(null)

function loginExpansion(): void {
    isLoginShow.value = true
}

function loginClose(): void {
    isLoginShow.value = false
}

navApi().then(res => {
    userInfo.value = res.data
})

provide('userInfo', userInfo)
provide('loginExpansion', loginExpansion)
</script>

<style lang="less" scoped>
.right-entry {
    display: flex;
    align-items: center;
    flex-shrink: 0;
    height: 100%;
    margin-left: 40px;
}
</style>