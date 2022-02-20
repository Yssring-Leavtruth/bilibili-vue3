import { playUrl } from './urlConfig'
import axios from 'axios'
import express from 'express'

const router = express.Router()

router.get('/playurl', (req, res) => {
    const query = req.query
    axios.get(playUrl, {params: query}).then(response => {
        res.send(response.data.data.durl[0].url)
    }).catch(err => {
        console.log('playurl', err)
        res.status(500)
    })
    
})

export default router