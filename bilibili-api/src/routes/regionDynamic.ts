import axios from 'axios'
import express from 'express'
import { regionDynamic } from './urlConfig'

const router = express.Router()

router.get('/regionDynamic', (req, res) => {
    const region = req.query.region as string
    if (Object.keys(regionDynamic).indexOf(region) !== -1) {
        const url = Reflect.get(regionDynamic, region)
        const params: {day_before?: number} = {}
        if (region === 'bangumi') {
            const day = new Date().getDay() - 1
            params.day_before = day != -1 ? day : 6
        }
        axios.get(url, {params}).then(response => {
            res.send(response.data)
        }).catch(err => {
            console.log('regionDynamic\n',err)
            res.status(500)
        })
    } else {
        res.status(404)
    }

})

export default router