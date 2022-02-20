export const getImageUrl = (path: string, url: string): string => {
    const patt = /.*bfs\/(.*?[\.jpg|\.png|\.gif])$/
    if (patt.exec(url)) {
        const size = path === 'face' ? '@72w_72h.webp' : '@672w_378h_1c_100q.webp'
        const str = patt.exec(url)![1]
        return `image/${str + size}`
    }
    return ''
}