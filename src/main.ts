import { createApp } from 'vue'
import App from './App.vue'
import './assets/styles/index.less'
import './assets/styles/base.less'
import { useObserve } from './utils'

const app = createApp(App)

app.directive('lazy', (el: HTMLElement, binding) => {
    useObserve(el, binding.value)
})

app.mount('#app')