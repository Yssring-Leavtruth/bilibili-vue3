import axios from 'axios'
import express from 'express'
import { extensionUrl } from './urlConfig'

const router = express.Router()

router.get('/extension', (req, res) => {
    axios.get(extensionUrl).then(response => {
        const extension = response.data.data
        res.send(extension)
    }).catch(err => {
        console.log('extension\n', err)
        res.status(500)
    })
})

export default router