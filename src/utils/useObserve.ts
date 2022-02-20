import { MaybeElementRef, useIntersectionObserver } from '@vueuse/core'

export const useObserve = (el: MaybeElementRef, apiFn?: any): void => {
  // const target = ref(null) // 获取真实的dom元素
  // stop是一个可执行的函数 用来手动停止监听 stop()
  const { stop } = useIntersectionObserver(
    el,
    ([{ isIntersecting }], observerElement) => {
      // isIntersecting: 当前监听的元素是否成功进入到视口区域如果进来了就是true 否则就是false
      // 有了一个判断是否进入视口区域的条件 如果为true就发送请求
      if (isIntersecting) {
        stop()
        // 可能随着业务不同调用接口函数也不同
        apiFn && apiFn()
        // 发送请求之后 立刻停止监听
      }
      // 监听处理不是只进行一次的 每次进入移出视口都会再次执行回调
    },
    // 0 - 1 数值越大代表 要求进入的面积越大才能触发回调函数
    { threshold: 0 }
  )
  // 只要调用当前函数就会return出去一个全新的对象中包含 target
  // 每一个组件中都可以使用独立的target ref对象和自己要监听的元素对象做绑定处理  互相不影响
}