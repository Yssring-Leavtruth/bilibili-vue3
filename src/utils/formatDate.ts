export const formatDate = (ts: number, str: string): string => {
    const date = new Date(ts)
    const time = {
        YY: date.getFullYear(),
        MM: date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1,
        DD: date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate(),
        hh: date.getHours() < 10 ? '0' + date.getHours() : date.getHours(),
        mm: date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes(),
        ss: date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds(),
    }
    let result = str
    for (let key in time) {
        result = result.replace(new RegExp(key), Reflect.get(time, key))
    }
    return result
}