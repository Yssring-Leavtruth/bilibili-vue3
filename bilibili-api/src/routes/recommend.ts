import aioRequest from "../utils/aioRequest"
import { recommendUrl } from './urlConfig'
import express from 'express'

const router = express.Router()

router.get('/recommend', (req, res) => {
    const cookie = 'SESSDATA=' + req.cookies['SESSDATA']
    aioRequest.get(recommendUrl, {cookie}).then((response: any) => {
        res.send(JSON.parse((response.body as string)))
    }).catch(err => {
        console.log('recommend\n', err)
        res.status(500)
    })
})

export default router