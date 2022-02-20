import aioRequest from '../utils/aioRequest'
import cheerio from 'cheerio'
import express from 'express'

const router = express.Router()

async function getBanner(): Promise<{code: number, data: unknown}> {
    let res: unknown
    try {
        res = await aioRequest.get('http://www.bilibili.com')
    } catch(e) {
        console.log(e)
        return {code: (e as any).statusCode, data: null}
    }
    const $ = cheerio.load(res as string)
    const html = $('.bili-header__banner')
    if (!html.html()) {
        return await getBanner()
    }
    const patt = /.*?url\((.*?)\)/
    const image = patt.exec(html.attr('style') as string)
    const banner = { image: image![1] }
    return {code: 0, data: banner}
}

router.get('/banner', async (req, res) => {
    const banner = await getBanner()
    if (banner.code == 0) {
        res.send(banner.data)
    } else {
        res.status(banner.code)
    }
})

export default router