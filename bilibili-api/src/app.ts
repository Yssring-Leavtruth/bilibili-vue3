import express from 'express'
import cors from 'cors'
import router from './routes'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'

const app = express()

app.all('*', (req, res, next) => {
    res.setHeader('Content-Security-Policy', 'upgrade-insecure-requests')
    next()
})

app.use(cors({
    credentials: true,
    origin: ['http://localhost:3000', 'https://yssring-leavtruth.github.io/']
}))

app.use(cookieParser())

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({ extended: true }))

app.use('/', router)

app.listen(9090, () => {
    console.log('服务器启动成功')
})