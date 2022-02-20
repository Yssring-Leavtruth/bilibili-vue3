"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var request_1 = __importDefault(require("request"));
var req = function (method, url, option) {
    return new Promise(function (resolve, reject) {
        try {
            (0, request_1.default)(__assign({ method: method, url: url }, option), function (error, response, body) {
                if (!error) {
                    var statusCode = response.statusCode;
                    if (statusCode < 300) {
                        resolve({ body: body, response: response });
                    }
                    else {
                        reject({ statusCode: statusCode, error: error });
                    }
                }
                else {
                    reject(error);
                }
            });
        }
        catch (e) {
            console.log(url + '\n');
            console.log(option + '\n');
            console.log(e);
            reject(e);
        }
    });
};
var get = function (url, headers, params) {
    var option = {
        qs: params,
        headers: __assign({ 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Safari/537.36' }, headers)
    };
    return req('GET', url, option);
};
var post = function (url, data, headers) {
    var option = {
        // json: true,
        // body: JSON.stringify(data),
        form: JSON.stringify(data),
        headers: __assign({ 
            // "content-type": "application/json, text/javascript, */*; q=0.01",
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8", 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Safari/537.36' }, headers)
    };
    return req('POST', url, option);
};
exports.default = { get: get, post: post };
