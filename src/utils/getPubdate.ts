import { formatDate } from "./formatDate"

export const getPubdate = (publish_time: number, showingYear: boolean = true): string => {
    const publishTime = new Date(publish_time * 1000)
    const presentTime = new Date()
    const hours = (presentTime.getTime() - publishTime.getTime()) / 1000 / 60 / 60
    const day = hours / 24

    if (presentTime.getFullYear() - publishTime.getFullYear() > 0) {
        if (showingYear) return formatDate(publish_time * 1000, 'YY MM-DD')
        else return formatDate(publish_time * 1000, 'MM-DD')
    } else if (Math.floor(hours) >= 24) {
        if (presentTime.getDate() - publishTime.getDate() > 1) {
            return formatDate(publish_time * 1000, 'MM-DD')
        } else {
            if (showingYear) return formatDate(publish_time * 1000, '昨天 hh:mm')
            else return '昨天'
        }
    } else {
        if (hours >= 1) return Math.floor(hours) + ' 小时前'
        else return Math.floor(hours * 60) + ' 分钟前'
    }
}