export const host = `${process.env.NODE_ENV === 'development' ? 'http://localhost:9090' : 'http://114.132.224.95:9090'}`

export const recommend = host + '/recommend'

export const banner = host + '/banner'

export const carousel = host + '/carousel'

export const channel = host + '/channel'

export const extension = host + '/extension'

export const live = host + '/live'

export const liveRecommend = host + '/live/recommend'

export const regionDynamic = host + '/regionDynamic'

export const rank = host + '/rank'

export const searchDefault = host + '/search/default'

export const searchTrending = host + '/search/trending'

export const search = host + '/search'

export const getLoginUrl = host + '/getLoginUrl'

export const getLoginInfo = host + '/getLoginInfo'

export const nav = host + '/nav'

export const stat = host + '/nav/stat'

export const dynamic = {
    video: host + '/dynamic/video',
    live: host + '/dynamic/live',
    article: host + '/dynamic/article'
}

export const history = {
    video: host + '/history/video',
    live: host + '/history/live',
    article: host + '/history/article'
}

export const favoriteFolder = host + '/favorite/folder'

export const favorite = host + '/favorite'

export const logout = host + '/logout'