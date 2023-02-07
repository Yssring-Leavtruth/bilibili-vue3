//登录url
export const loginUrl = 'https://passport.bilibili.com/qrcode/getLoginUrl'

//导航及用户信息
export const navUrl = 'https://api.bilibili.com/x/web-interface/nav'

//用户关注、粉丝人数
export const statUrl = 'https://api.bilibili.com/x/web-interface/nav/stat'

//视频动态
export const dynamic = {
    video: 'https://api.vc.bilibili.com/dynamic_svr/v1/dynamic_svr/dynamic_new?type_list=8', //params: uid
    live: 'https://api.live.bilibili.com/xlive/web-ucenter/v1/xfetter/FeedList?page=1&pagesize=20',
    article: 'https://api.vc.bilibili.com/dynamic_svr/v1/dynamic_svr/dynamic_new?type_list=64' //params: uid
}

//收藏夹目录
export const favoriteFolderUrl = 'https://api.bilibili.com/x/v3/fav/folder/list4navigate'

//收藏夹
export const favoriteUrl = 'https://api.bilibili.com/x/v3/fav/resource/list4navigate?platform=web' //params: media_id

//历史记录
export const history = {
    video: 'https://api.bilibili.com/x/web-interface/history/cursor?type=archive&ps=20',
    live: 'https://api.bilibili.com/x/web-interface/history/cursor?type=live&ps=20',
    article: 'https://api.bilibili.com/x/web-interface/history/cursor?type=article&ps=20'
}

//登录信息
export const loginInfoUrl = 'https://passport.bilibili.com/qrcode/getLoginInfo' //body: oauthKey

//推荐
export const recommendUrl = 'https://api.bilibili.com/x/web-interface/wbi/index/top/feed/rcmd?ps=10'

//推广
export const extensionUrl = 'http://api.bilibili.com/x/web-show/res/loc?pf=0&id=34'

//直播
export const liveUrl = 'https://api.live.bilibili.com/xlive/web-interface/v1/webMain/getList?platform=web'

//直播推荐房间
export const liveRecommendUrl = 'https://api.live.bilibili.com/xlive/web-interface/v1/webMain/getMoreRecList?platform=web'

//关注主播的房间
export const relationUrl = 'https://api.live.bilibili.com/relation/v1/feed/feed_list?pagesize=8&page=1'

//视频
export const playUrl = 'https://api.bilibili.com/x/player/playurl' //params: cid, bvid

//各分区推荐
const regionDynamicUrl = 'https://api.bilibili.com/x/web-interface/dynamic/region?ps=12&pn=2&'

export const regionDynamic = {
    //动画区 rid=1
    douga: regionDynamicUrl + 'rid=1',
    //番剧 https://api.bilibili.com/pgc/web/timeline/v2?day_before=0&day_after=6&season_type=1
    bangumi: 'https://api.bilibili.com/pgc/web/timeline/v2?day_after=6&season_type=1',
    //音乐区 rid=3
    music: regionDynamicUrl + 'rid=3',
    //游戏区 rid=4
    game: regionDynamicUrl + 'rid=4',
    //综艺区 rid=5
    ent: regionDynamicUrl + 'rid=5',
    //舞蹈区 rid=129
    dance: regionDynamicUrl + 'rid=129',
    //国创区 rid=168
    guochuang: regionDynamicUrl + 'rid=168',
    //知识区 rid=36
    technology: regionDynamicUrl + 'rid=36',
    //数码区 rid=188
    //运动区 rid=234
    //汽车区 rid=223
    //生活区 rid=160
    life: regionDynamicUrl + 'rid=160',
    //美食区 rid=211
    //鬼畜区 rid=119
    kichiku: regionDynamicUrl + 'rid=119'
}

//新版3日排行
const rankUrl = 'https://api.bilibili.com/x/web-interface/ranking/region?day=3&original=0&'

export const rank = {
    //动画排行 rid=1
    douga: rankUrl + 'rid=1',
    //番剧排行
    bangumi: 'https://api.bilibili.com/pgc/season/rank/web/list?day=3&season_type=1',
    //音乐排行 rid=3
    music: rankUrl + 'rid=3',
    //游戏排行 rid=4
    game: rankUrl + 'rid=4',
    //综艺排行 rid=5
    ent: rankUrl + 'rid=5',
    //舞蹈排行 rid=129
    dance: rankUrl + 'rid=129',
    //国创排行
    guoman: 'https://api.bilibili.com/pgc/season/rank/web/list?day=3&season_type=4',
    //国创二创排行 rid=168
    guochuang: rankUrl + 'rid=168',
    //知识排行 rid=36
    technology: rankUrl + 'rid=36',
    //数码排行 rid=188
    //运动排行 rid=234
    //汽车排行 rid=223
    //生活排行 rid=160
    life: rankUrl + 'rid=160',
    //美食排行 rid=211
    //鬼畜排行 rid=119
    kichiku: rankUrl + 'rid=119',
    //电影排行
    movies: 'https://api.bilibili.com/pgc/season/rank/web/list?day=3&season_type=2',
    //电视剧排行
    teleplay: 'https://api.bilibili.com/pgc/season/rank/web/list?day=3&season_type=5',
    //纪录片排行
    documentary: 'https://api.bilibili.com/pgc/season/rank/web/list?day=3&season_type=3'
}

//番剧3日排行
export const bangumiRankUrl = 'https://api.bilibili.com/pgc/season/rank/web/list?day=3&season_type=1'
//season_type=2 电影排行
//season_type=3 纪录片排行
//season_type=4 国创排行
//season_type=5 电视剧排行


// 各分类下3日排行 http://www.bilibili.com/index/catalogy/
// 动画排行 1-3day.json
// 番剧排行 13-3day.json
// 音乐排行 3-3day.json
// 舞蹈排行 129-3day.json
// 游戏排行 3-3day.json
// 科技排行 36-3day.json
// 生活排行 160-3day.json
// 鬼畜排行 119-3day.json
// 时尚排行 155-3day.json
// 广告排行 165-3day.json
// 娱乐排行 5-3day.json
// 电影排行 23-3day.json
// TV剧集排行 11-3day.json

// 各分类下7日排行
// 动画排行 1-week.json

//搜索候选条目
export const search = 'https://s.search.bilibili.com/main/suggest?func=suggest&suggest_type=accurate&sub_type=tag&main_ver=v1&highlight=&userid=&bangumi_acc_num=1&special_acc_num=1&topic_acc_num=1&upuser_acc_num=3&tag_num=10&special_num=10&bangumi_num=10&upuser_num=3'

//搜索框默认
export const searchDefault = 'https://api.bilibili.com/x/web-interface/search/default'

//热搜
export const searchTrending = 'https://api.bilibili.com/x/web-interface/search/square?limit=10'

//获取登录二维码
export const login = 'https://passport.bilibili.com/qrcode/getLoginUrl'