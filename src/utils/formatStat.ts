export const formatStat = (stat: number | string): string => {
    let value = stat + ''
    if (value.length < 5) {
        return value
    } else if (value.length < 9) {
        const mantissa = value.slice(-4, -3) !== '0' ? '.' + value.slice(-4, -3) : ''
        return value.slice(0, -4) + mantissa + '万'
    } else {
        const mantissa = value.slice(-8, -7) !== '0' ? '.' + value.slice(-8, -7) : ''
        return value.slice(0, -8) + mantissa + '亿'
    }
}