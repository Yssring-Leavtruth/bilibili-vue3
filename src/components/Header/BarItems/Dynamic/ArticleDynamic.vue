<template>
    <dynamic-container
        :isLoading="isLoading"
        footerLink="https://t.bilibili.com/"
    >
        <template v-if="data.length">
            <container-item
                v-for="item in data"
                :key="item.id"
                :title="item.title"
                :name="item.owner.uname"
                :face="item.owner.face"
                :verify="item.owner.verify"
                :cover="item.image_urls[0]"
                @click="click('https://www.bilibili.com/read/cv' + item.id)"
            >{{ item.publishTime }}</container-item>
        </template>
    </dynamic-container>
</template>

<script setup lang="ts">
import DynamicContainer from './DynamicContainer.vue'
import ContainerItem from './ContainerItem.vue'
import { dynamicApi } from '../../../../api'
import { inject, ref } from '@vue/runtime-core'
import { getPubdate } from '../../../../utils'

const userInfo = inject('userInfo')
const isLoading = ref(true)
const data = ref([])

if (userInfo.value.isLogin && data.value.length == 0) {
    dynamicApi.article(userInfo.value.mid).then(res => {
        data.value = res.data.cards.map((item) => {
            const card = {...JSON.parse(item.card)}
            card.owner = item.desc.user_profile.info
            card.owner.verify = item.desc.user_profile.card.official_verify
            card.publishTime = getPubdate(card.publish_time)
            return card
        })
        isLoading.value = false
    })
}

function click(url): void {
    window.open(url)
}

</script>