import express from 'express'
import aioRequest from '../utils/aioRequest'
import { favoriteFolderUrl, favoriteUrl } from './urlConfig'

const router = express.Router()

router.get('/favorite/folder', (req, res) => {
    const cookie = 'SESSDATA=' + req.cookies['SESSDATA']
    aioRequest.get(favoriteFolderUrl, { cookie }).then((response: any) => {
        res.send(JSON.parse((response.body as string)))
    }).catch(err => {
        console.log('favorite/folder\n', err)
        res.status(500)
    })
})

router.get('/favorite', (req, res) => {
    const media_id = req.query.media_id
    if (media_id) {
        const params = { media_id }
        const cookie = 'SESSDATA=' + req.cookies['SESSDATA']
        aioRequest.get(favoriteUrl, { cookie }, params).then((response: any) => {
            res.send(JSON.parse((response.body as string)))
        }).catch(err => {
            console.log('favorite\n', err)
            res.status(500)
        })
    } else {
        res.status(412)
    }
})

export default router