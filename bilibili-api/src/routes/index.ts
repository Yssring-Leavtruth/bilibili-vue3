import express from 'express'
import banner from './banner'
import carousel from './carousel'
import extension from './extension'
import channel from './channel'
import live from './live'
import regionDynamic from './regionDynamic'
import rank from './rank'
import search from './search'
import video from './video'
import getLoginUrl from './getLoginUrl'
import getLoginInfo from './getLoginInfo'
import recommend from './recommend'
import nav from './nav'
import dynamic from './dynamic'
import favorite from './favorite'
import history from './history'
import logout from './logout'

const router = express.Router()

router.use(banner)

router.use(carousel)

router.use(extension)

router.use(channel)

router.use(live)

router.use(regionDynamic)

router.use(rank)

router.use(search)

router.use(video)

router.use(getLoginUrl)

router.use(getLoginInfo)

router.use(recommend)

router.use(nav)

router.use(dynamic)

router.use(favorite)

router.use(history)

router.use(logout)

export default router