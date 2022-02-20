"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var aioRequest_1 = __importDefault(require("../utils/aioRequest"));
var urlConfig_1 = require("./urlConfig");
var router = express_1.default.Router();
router.get('/dynamic/video', function (req, res) {
    var uid = req.query.uid;
    if (uid) {
        var params = { uid: uid };
        var cookie = 'SESSDATA=' + req.cookies['SESSDATA'];
        aioRequest_1.default.get(urlConfig_1.dynamic.video, { cookie: cookie }, params).then(function (response) {
            res.send(JSON.parse(response.body));
        }).catch(function (err) {
            console.log('dynamic/video\n', err);
            res.status(500);
        });
    }
    else {
        res.status(412);
    }
});
router.get('/dynamic/article', function (req, res) {
    var uid = req.query.uid;
    if (uid) {
        var params = { uid: uid };
        var cookie = 'SESSDATA=' + req.cookies['SESSDATA'];
        aioRequest_1.default.get(urlConfig_1.dynamic.article, { cookie: cookie }, params).then(function (response) {
            res.send(JSON.parse(response.body));
        }).catch(function (err) {
            console.log('dynamic/article\n', err);
            res.status(500);
        });
    }
    else {
        res.status(412);
    }
});
router.get('/dynamic/live', function (req, res) {
    var cookie = 'SESSDATA=' + req.cookies['SESSDATA'];
    aioRequest_1.default.get(urlConfig_1.dynamic.live, { cookie: cookie }).then(function (response) {
        res.send(JSON.parse(response.body));
    }).catch(function (err) {
        console.log('dynamic/live\n', err);
        res.status(500);
    });
});
exports.default = router;
