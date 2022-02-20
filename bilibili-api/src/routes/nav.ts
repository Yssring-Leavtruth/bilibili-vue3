import aioRequest from "../utils/aioRequest"
import express from 'express'
import { navUrl, statUrl } from './urlConfig'

const router = express.Router()

router.get('/nav', (req, res) => {
    const cookie = 'SESSDATA=' + req.cookies['SESSDATA']
    aioRequest.get(navUrl, {cookie}).then((response: any) => {
        res.send(JSON.parse((response.body as string)))
    }).catch(err => {
        console.log('nav\n', err)
        res.status(500)
    })
})

router.get('/nav/stat', (req, res) => {
    const cookie = 'SESSDATA=' + req.cookies['SESSDATA']
    aioRequest.get(statUrl, {cookie}).then((response: any) => {
        res.send(JSON.parse((response.body as string)))
    }).catch(err => {
        console.log('nav/stat\n', err)
        res.status(500)
    })
})

export default router