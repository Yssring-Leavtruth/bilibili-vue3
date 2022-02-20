export const timeout = (): Promise<string> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => { resolve('ok') }, 1)
    })
}