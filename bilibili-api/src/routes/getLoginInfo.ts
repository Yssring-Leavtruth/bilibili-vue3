import express from 'express'
import { loginInfoUrl } from './urlConfig'
import axios from 'axios'
import qs from 'qs'

const router = express.Router()

router.post('/getLoginInfo', (req, res) => {
    const oauthKey = req.body.oauthKey
    if (!oauthKey) res.status(400)
    axios.post(loginInfoUrl, qs.stringify({oauthKey})).then(response => {
        const reslut = response.data
        if (reslut.status) {
            const cookies = response.headers['set-cookie']
            cookies?.forEach(item => {
                const cookie = item.split(';')[0].split('=')
                res.cookie(cookie[0], cookie[1], { maxAge: 31536000 * 1000 })
            })
        }
        res.send(response.data)
    })
})

export default router