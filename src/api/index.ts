import * as url from './urlConfig'
import axios from 'axios'

axios.defaults.withCredentials = true

//获取推荐
export const recommendApi = (): Promise<unknown> => {
    return axios.get(url.recommend).then(res => res.data)
}

//获取顶部图
export const bannerApi = (): Promise<unknown> => {
    return axios.get(url.banner).then(res => res.data)
}

//获取轮播图
export const carouselApi = (): Promise<unknown> => {
    return axios.get(url.carousel).then(res => res.data)
}

//获取频道
export const channelApi = (): Promise<unknown> => {
    return axios.get(url.channel).then(res => res.data)
}

//获取推广
export const extensionApi = (): Promise<unknown> => {
    return axios.get(url.extension).then(res => res.data)
}

//获取直播
export const liveApi = (): Promise<unknown> => {
    return axios.get(url.live).then(res => res.data)
}

//获取直播推荐房间
export const liveRecommendApi = (): Promise<unknown> => {
    return axios.get(url.liveRecommend).then(res => res.data)
}

//获取各分区推荐视频
export const regionDynamicApi = (region: string): Promise<unknown> => {
    return axios.get(url.regionDynamic, { params: { region } }).then(res => res.data)
}

//获取各分区排行榜
export const rankApi = (region: string): Promise<unknown> => {
    return axios.get(url.rank, { params: { region } }).then(res => res.data)
}

//获取搜索框默认内容
export const searchDefaultApi = (): Promise<unknown> => {
    return axios.get(url.searchDefault).then(res => res.data)
}

//获取热搜
export const searchTrendingApi = (): Promise<unknown> => {
    return axios.get(url.searchTrending).then(res => res.data)
}

//获取搜索结果候选
export const searchApi = (term: string): Promise<unknown> => {
    return axios.get(url.search, { params: { term } }).then(res => res.data)
}

//获取登录url
export const getLoginUrlApi = (): Promise<unknown> => {
    return axios.get(url.getLoginUrl).then(res => res.data)
}

//获取登录信息
export const getLoginInfoApi = (oauthKey: string): Promise<unknown> => {
    return axios.post(url.getLoginInfo, { oauthKey }).then(res => res.data)
}

//获取导航及用户信息
export const navApi = (): Promise<unknown> => {
    return axios.get(url.nav).then(res => res.data)
}

//获取用户关注、粉丝人数
export const statApi = (): Promise<unknown> => {
    return axios.get(url.stat).then(res => res.data)
}

//获取动态
export const dynamicApi = {
    video: (uid: number | string): Promise<unknown> => {
        return axios.get(url.dynamic.video, { params: { uid } }).then(res => res.data)
    },
    live: (): Promise<unknown> => {
        return axios.get(url.dynamic.live).then(res => res.data)
    },
    article: (uid: number | string): Promise<unknown> => {
        return axios.get(url.dynamic.article, { params: { uid } }).then(res => res.data)
    }
}

//获取历史记录
export const historyApi = {
    video: (): Promise<unknown> => {
        return axios.get(url.history.video).then(res => res.data)
    },
    live: (): Promise<unknown> => {
        return axios.get(url.history.live).then(res => res.data)
    },
    article: (): Promise<unknown> => {
        return axios.get(url.history.article).then(res => res.data)
    },
}

//获取收藏夹目录
export const favoriteFolderApi = (): Promise<unknown> => {
    return axios.get(url.favoriteFolder).then(res => res.data)
}

//获取收藏夹
export const favoriteApi = (media_id: number | string): Promise<unknown> => {
    return axios.get(url.favorite, {params: {media_id}}).then(res => res.data)
}

//退出登录
export const logoutApi = (): Promise<unknown> => {
    return axios.get(url.logout).then(res => res.data)
}