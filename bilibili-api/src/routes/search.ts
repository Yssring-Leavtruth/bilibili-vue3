import axios from 'axios'
import express from 'express'
import { searchDefault, searchTrending, search } from './urlConfig'

const router = express.Router()

router.get('/search', (req, res) => {
   const params = { term: req.query.term }
   axios.get(search, { params }).then(response => {
      res.send(response.data)
   }).catch(err => {
      console.log('search', err)
      res.status(500)
   })
})

router.get('/search/default', (req, res) => {
   axios.get(searchDefault).then(response => {
      res.send(response.data.data)
   }).catch(err => {
      console.log('searchDefault', err)
      res.status(500)
   })
})

router.get('/search/trending', async (req, res) => {
   axios.get(searchTrending).then(response => {
      res.send(response.data.data)
   }).catch(err => {
      console.log('searchTrending', err)
      res.status(500)
   })
})

export default router