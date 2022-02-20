import axios from 'axios'
import express from 'express'
import { loginUrl } from './urlConfig'

const router = express.Router()

router.get('/getLoginUrl', (req, res) => {
    axios.get(loginUrl).then(response => {
        res.send(response.data)
    }).catch(err => {
        console.log(err)
        res.status(500)
    })
})

export default router