import axios from 'axios'
import express from 'express'
import { rank } from './urlConfig'

const router = express.Router()

router.get('/rank', (req, res) => {
    const region = req.query.region as string
    if (Object.keys(rank).indexOf(region) !== -1) {
        const url = Reflect.get(rank, region)
        axios.get(url).then(response => {
            res.send(response.data.data)
        }).catch(err => {
            console.log('rank', err)
            res.status(500)
        })
    } else {
        res.status(404)
    }

})

export default router