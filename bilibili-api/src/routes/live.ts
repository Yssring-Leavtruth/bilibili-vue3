import axios from 'axios'
import express from 'express'
import { liveUrl, liveRecommendUrl } from './urlConfig'

const router = express.Router()

router.get('/live', (req, res) => {
    axios.get(liveUrl).then(response => {
        res.send(response.data.data)
    }).catch(err => {
        console.log('live\n', err)
        res.status(500)
    })
})

router.get('/live/recommend', (req, res) => {
    axios.get(liveRecommendUrl).then(response => {
        res.send(response.data.data.recommend_room_list)
    }).catch(err => {
        console.log('live/recommend\n', err)
        res.status(500)
    })
})

export default router