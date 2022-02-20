import request from "request"

const req = (method: 'GET' | 'POST', url: string, option: request.CoreOptions): Promise<unknown> => {
    return new Promise((resolve, reject) => {
        try {
            request({
                method,
                url,
                ...option
            }, (error, response, body) => {
                if (!error) {
                    const statusCode = response.statusCode
                    if (statusCode < 300) {
                        resolve({body, response})
                    } else {
                        reject({statusCode, error})
                    }
                } else {
                    reject(error)
                }
            })
        } catch (e) {
            console.log(url + '\n')
            console.log(option + '\n')
            console.log(e)
            reject(e)
        } 
    })
}

const get = (url: string, headers?: object, params?: object): Promise<unknown> => {
    const option: request.CoreOptions = {
        qs: params,
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Safari/537.36',
            ...headers,
        }
    }
    
    return req('GET', url, option)
}

const post = (url: string, data?: unknown, headers?: object): Promise<unknown> => {
    const option: request.CoreOptions = {
        // json: true,
        // body: JSON.stringify(data),
        form: JSON.stringify(data),
        headers: {
            // "content-type": "application/json, text/javascript, */*; q=0.01",
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Safari/537.36',
            ...headers
        }
    }

    return req('POST', url, option)
}

export default {get, post}