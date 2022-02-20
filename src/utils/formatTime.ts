export const formatTime = (date: number): string => {
    if (date < 60) {
        const s = date > 9 ? date : '0' + date
        return '00:' + s
    } else {
        const s = date % 60 ? date % 60 + '' : '00'
        const m = Math.floor(date / 60 % 60)
        const h = Math.floor(date / 60 / 60 % 60)
        let reslut = ''

        for (let i of [h, m]) {
            if (i) {
                reslut += i > 9 ? '' + i : '0' + i
                reslut += ':'
            }
        }
        return reslut + (s.length > 1 ? s : '0' + s)
    }
}