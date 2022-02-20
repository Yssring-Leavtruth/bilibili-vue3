"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var aioRequest_1 = __importDefault(require("../utils/aioRequest"));
var urlConfig_1 = require("./urlConfig");
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
router.get('/recommend', function (req, res) {
    var cookie = 'SESSDATA=' + req.cookies['SESSDATA'];
    aioRequest_1.default.get(urlConfig_1.recommendUrl, { cookie: cookie }).then(function (response) {
        res.send(JSON.parse(response.body));
    }).catch(function (err) {
        console.log('recommend\n', err);
        res.status(500);
    });
});
exports.default = router;
