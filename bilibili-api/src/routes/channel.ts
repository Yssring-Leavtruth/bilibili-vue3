import getData from '../utils/getData'
import express from 'express'

const router = express.Router()

// async function getChannel(): Promise<{code: number, data: unknown}> {
//     let res: unknown
//     try {
//         res = await aioRequest('http://www.bilibili.com')
//     } catch (e) {
//         console.log(e)
//         return {code: (e as any).statusCode, data: null}
//     }
//     const $ = cheerio.load(res as string)
//     const html = $('.bili-header__channel')
//     if (!html.html()) {
//         return await getChannel()
//     }
//     interface iChannel {
//         icons: { title: string, uri: string | undefined, svg: string | null }[]
//         items: { title: string, uri: string | undefined }[]
//     }
//     const channel: iChannel = { icons: [], items: [] }
//     html.find('.channel-icons > .channel-icons__item').each((i, item) => {
//         channel.icons.push({
//             title: $(item).find('span').text(),
//             uri: $(item).attr('href'),
//             svg: $(item).find('div').html()
//         })
//     })
//     html.find('.channel-items > .channel-link').each((i, item) => {
//         channel.items.push({
//             title: $(item).text(),
//             uri: $(item).attr('href')
//         })
//     })

//     return {code: 0, data: channel}
// }

router.get('/channel', async (req, res) => {
    const channel = await getData('channel')
    res.send(channel)
})

export default router