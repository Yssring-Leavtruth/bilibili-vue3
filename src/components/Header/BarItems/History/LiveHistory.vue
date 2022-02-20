<template>
    <history-container
        :isLoading="isLoading"
        footerLink="https://t.bilibili.com/"
    >
        <template v-for="(i, k) in data">
            <template v-if="data[k].length">
                <div class="date-title">{{ date[k] }}</div>
                <container-item
                    v-for="item in data[k]"
                    :key="item.history.cid"
                    :title="item.title"
                    :name="item.author_name"
                    :date="item.date"
                    :show-title="item.show_title"
                    :badge="item.badge"
                    :cover="item.cover"
                    @click="click(item.uri)"
                    ><span :class="{'badge-text': true, 'badge-red': item.live_status}">{{
                        item.badge
                    }}</span></container-item>
            </template>
        </template>
    </history-container>
</template>

<script setup lang="ts">
import HistoryContainer from './HistoryContainer.vue'
import ContainerItem from './ContainerItem.vue'
import { historyApi } from '../../../../api'
import { formatDate } from '../../../../utils'
import { inject, ref } from '@vue/runtime-core'

const userInfo = inject('userInfo')
const isLoading = ref(true)
const date = { today: '今天', yesterday: '昨天', earlier: '更早' }
const data = ref({ today: [], yesterday: [], earlier: [] })

if (userInfo.value.isLogin && isLoading.value) {
    historyApi.live(userInfo.value.mid).then(res => {
        res.data.list.forEach(item => {
            const viewTime = formatDate(item.view_at * 1000, 'YYMMDD') * 1
            const presentTime = formatDate(Date.now(), 'YYMMDD') * 1
            if (presentTime - viewTime > 1) {
                const date = formatDate(item.view_at * 1000, 'MM-DD hh:mm')
                data.value.earlier.push({ ...item, date })
            } else if (presentTime - viewTime > 0) {
                const date = formatDate(item.view_at * 1000, '昨天 hh:mm')
                data.value.yesterday.push({ ...item, date })
            } else {
                const date = formatDate(item.view_at * 1000, '今天 hh:mm')
                data.value.today.push({ ...item, date })
            }
        })
        isLoading.value = false
    })
}

function click(url): void {
    window.open(url)
}

</script>

<style lang="less" scoped>
.date-title {
    font-size: 12px;
    color: #999;
    padding: 15px 0 4px 20px;
}
.badge-text {
    background-color: #00000061;
    font-size: 12px;
    color: #fff;
    padding: 1px 3px;
    border-radius: 2px;
}

.badge-red {
    background-color: #fb7299;
}
</style>