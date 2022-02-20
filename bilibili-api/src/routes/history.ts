import express from 'express'
import aioRequest from '../utils/aioRequest'
import { history } from './urlConfig'

const router = express.Router()

router.get('/history/video', (req, res) => {
    const cookie = 'SESSDATA=' + req.cookies['SESSDATA']
    aioRequest.get(history.video, { cookie }).then((response: any) => {
        res.send(JSON.parse((response.body as string)))
    }).catch(err => {
        console.log('history/video\n', err)
        res.status(500)
    })

})

router.get('/history/live', (req, res) => {
    const cookie = 'SESSDATA=' + req.cookies['SESSDATA']
    aioRequest.get(history.live, { cookie }).then((response: any) => {
        res.send(JSON.parse((response.body as string)))
    }).catch(err => {
        console.log('history/live\n', err)
        res.status(500)
    })

})

router.get('/history/article', (req, res) => {
    const cookie = 'SESSDATA=' + req.cookies['SESSDATA']
    aioRequest.get(history.article, { cookie }).then((response: any) => {
        res.send(JSON.parse((response.body as string)))
    }).catch(err => {
        console.log('history/article\n', err)
        res.status(500)
    })

})
// router.get('/dynamic/article', (req, res) => {
//     const uid = req.query.uid as string
//     if (uid) {
//         const params = { uid }
//         const cookie = 'SESSDATA=' + req.cookies['SESSDATA']
//         aioRequest.get(dynamic.article, { cookie }, params).then((response: any) => {
//             res.send(JSON.parse((response.body as string)))
//         }).catch(err => {
//             console.log('dynamic/article\n', err)
//             res.status(500)
//         })
//     } else {
//         res.status(412)
//     }
// })

// router.get('/dynamic/live', (req, res) => {
//     const cookie = 'SESSDATA=' + req.cookies['SESSDATA']
//     aioRequest.get(dynamic.live, { cookie }).then((response: any) => {
//         res.send(JSON.parse((response.body as string)))
//     }).catch(err => {
//         console.log('dynamic/live\n', err)
//         res.status(500)
//     })

// })

export default router