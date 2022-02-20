"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var aioRequest_1 = __importDefault(require("../utils/aioRequest"));
var express_1 = __importDefault(require("express"));
var urlConfig_1 = require("./urlConfig");
var router = express_1.default.Router();
router.get('/nav', function (req, res) {
    var cookie = 'SESSDATA=' + req.cookies['SESSDATA'];
    aioRequest_1.default.get(urlConfig_1.navUrl, { cookie: cookie }).then(function (response) {
        res.send(JSON.parse(response.body));
    }).catch(function (err) {
        console.log('nav\n', err);
        res.status(500);
    });
});
router.get('/nav/stat', function (req, res) {
    var cookie = 'SESSDATA=' + req.cookies['SESSDATA'];
    aioRequest_1.default.get(urlConfig_1.statUrl, { cookie: cookie }).then(function (response) {
        res.send(JSON.parse(response.body));
    }).catch(function (err) {
        console.log('nav/stat\n', err);
        res.status(500);
    });
});
exports.default = router;
