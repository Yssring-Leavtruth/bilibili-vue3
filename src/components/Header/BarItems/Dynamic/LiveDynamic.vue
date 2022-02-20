<template>
    <dynamic-container
        :isLoading="isLoading"
        footerLink="https://link.bilibili.com/p/center/index#/user-center/follow/1"
    >
        <template v-if="data.length">
            <container-item
                v-for="item in data"
                :key="item.roomid"
                :title="item.title"
                :name="item.uname"
                :face="item.face"
                :cover="item.pic"
                @click="click(item.link)"
                #live
                >正在直播</container-item
            >
        </template>
    </dynamic-container>
</template>

<script setup lang="ts">
import DynamicContainer from './DynamicContainer.vue'
import ContainerItem from './ContainerItem.vue'
import { dynamicApi } from '../../../../api'
import { inject, ref } from '@vue/runtime-core'

const userInfo = inject('userInfo')
const isLoading = ref(true)
const data = ref([])

if (userInfo.value.isLogin && data.value.length == 0) {
    dynamicApi.live().then(res => {
        data.value = res.data.list
        isLoading.value = false
    })
}

function click(url): void {
    window.open(url)
}

</script>