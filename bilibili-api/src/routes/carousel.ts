import getData from '../utils/getData'
import express from 'express'

const router = express.Router()

// async function getCarousel(): Promise<{code: number, data: unknown}> {
//     let res: unknown
//     try {
//         res = await aioRequest('http://www.bilibili.com')
//     } catch(e) {
//         console.log(e)
//         return {code: (e as any).statusCode, data: null}
//     }
//     const $ = cheerio.load(res as string)
//     const html = $('.carousel-transform.clearfix')
//     if (!html.html()) {
//         return await getCarousel()
//     }
//     const carousel: object[] = []
//     html.find('div > a > div > picture > img').each((i, item) => {
//         carousel.push({
//             title: $(item).attr('alt'),
//             img: $(item).attr('src')
//         })
//     })
//     return {code: 0, data: carousel}
// }

router.get('/carousel', async (req, res) => {
    const carousel = await getData('carousel')
    res.send(carousel)
})

export default router