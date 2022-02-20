"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
var express_1 = __importDefault(require("express"));
var urlConfig_1 = require("./urlConfig");
var router = express_1.default.Router();
router.get('/extension', function (req, res) {
    axios_1.default.get(urlConfig_1.extensionUrl).then(function (response) {
        var extension = response.data.data;
        res.send(extension);
    }).catch(function (err) {
        console.log('extension\n', err);
        res.status(500);
    });
});
exports.default = router;
