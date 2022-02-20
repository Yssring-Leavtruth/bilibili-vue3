import fs from 'fs'
import path from 'path'

export default (name: string): Promise<unknown> => {
    return new Promise((resolve, reject) => {
        fs.readFile(path.join(__dirname, '../../data/' + name + '.json'), (err, data) => {
            if (!err) {
                resolve(JSON.parse(data.toString()))
            } else {
                reject(err)
            }
        })
    })
}