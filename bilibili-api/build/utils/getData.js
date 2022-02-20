"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
exports.default = (function (name) {
    return new Promise(function (resolve, reject) {
        fs_1.default.readFile(path_1.default.join(__dirname, '../../data/' + name + '.json'), function (err, data) {
            if (!err) {
                resolve(JSON.parse(data.toString()));
            }
            else {
                reject(err);
            }
        });
    });
});
