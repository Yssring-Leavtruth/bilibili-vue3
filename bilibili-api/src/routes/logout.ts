import express from 'express'

const router = express.Router()

router.get('/logout', (req, res) => {
    for (let i in req.cookies) {
        res.cookie(i , req.cookies[i], {maxAge: -1})
    }
    res.send()
})

export default router