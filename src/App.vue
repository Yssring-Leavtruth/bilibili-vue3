<template>
    <header id="header">
        <bar />
        <banner v-once />
        <channel v-once />
    </header>
    <main id="main">
        <recommend />
        <extension />
        <live />
        <douga />
        <bangumi />
        <music />
        <dance />
        <game />
        <palette />
    </main>
    <div id="popover-gounrd"></div>
</template>

<script setup lang="ts">
import Bar from './components/Header/Bar.vue'
import Channel from './components/Header/Channel.vue'
import Banner from './components/Header/Banner.vue'
import Recommend from './components/Recommend/Recommend.vue'
import Extension from './components/Region/Extension/Extension.vue'
import Live from './components/Region/Live/Live.vue'
import Douga from './components/Region/Douga/Douga.vue'
import Bangumi from './components/Region/Bangumi/Bangumi.vue'
import Music from './components/Region/Music/Music.vue'
import Dance from './components/Region/Dance/Dance.vue'
import Game from './components/Region/Game/Game.vue'
import Palette from './components/Common/Palette.vue'

</script>

<style lang="less">
#header {
    position: relative;
    max-width: 2078px;
    min-width: 1100px;
}

#main {
    box-sizing: border-box;
    position: relative;
    width: 100%;
    max-width: 2078px;
    min-width: 1100px;
    padding: 0 96px;
    margin: 0 auto;
}

@media screen and (max-width: 1700px) {
    #main,
    .header-channel {
        padding: 0 64px !important;
    }

    #header {
        .header-channel {
            height: 110px !important;
        }
    }
}

@media screen and (max-width: 1350px) {
    #main,
    .header-channel {
        padding: 0 56px !important;
    }

    #header {
        .header-channel {
            height: 100px !important;
        }
    }
}
</style>