import express from 'express'
import request from 'request'
import axios from 'axios'
import { playUrl } from './urlConfig'

const router = express.Router()

router.get('/video', async (req, res) => {
    const { cid, bvid } = req.query
    axios.get(playUrl, { params: { cid, bvid, qn: 16 } }).then(response => {
        const url = response.data.data.durl[0].url
        const option = {
            headers: {
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Safari/537.36',
                'referer': 'https://www.bilibili.com/'
            }
        }

        const head = { 'Content-Type': 'video/mp4' }
        res.writeHead(200, head)

        request.get(url as string, option, (error, response, body) => {
            if (!error) {
                const statusCode = response.statusCode
                if (statusCode !== 200) {
                    console.log(error, statusCode)
                    res.status(statusCode)
                }
            } else {
                console.log(error)
                res.status(500)

            }
        }).pipe(res)
        
    }).catch(err => {
        console.log('video', err)
        res.status(500)
    })
})

export default router