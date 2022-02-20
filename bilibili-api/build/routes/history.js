"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var aioRequest_1 = __importDefault(require("../utils/aioRequest"));
var urlConfig_1 = require("./urlConfig");
var router = express_1.default.Router();
router.get('/history/video', function (req, res) {
    var cookie = 'SESSDATA=' + req.cookies['SESSDATA'];
    aioRequest_1.default.get(urlConfig_1.history.video, { cookie: cookie }).then(function (response) {
        res.send(JSON.parse(response.body));
    }).catch(function (err) {
        console.log('history/video\n', err);
        res.status(500);
    });
});
router.get('/history/live', function (req, res) {
    var cookie = 'SESSDATA=' + req.cookies['SESSDATA'];
    aioRequest_1.default.get(urlConfig_1.history.live, { cookie: cookie }).then(function (response) {
        res.send(JSON.parse(response.body));
    }).catch(function (err) {
        console.log('history/live\n', err);
        res.status(500);
    });
});
router.get('/history/article', function (req, res) {
    var cookie = 'SESSDATA=' + req.cookies['SESSDATA'];
    aioRequest_1.default.get(urlConfig_1.history.article, { cookie: cookie }).then(function (response) {
        res.send(JSON.parse(response.body));
    }).catch(function (err) {
        console.log('history/article\n', err);
        res.status(500);
    });
});
// router.get('/dynamic/article', (req, res) => {
//     const uid = req.query.uid as string
//     if (uid) {
//         const params = { uid }
//         const cookie = 'SESSDATA=' + req.cookies['SESSDATA']
//         aioRequest.get(dynamic.article, { cookie }, params).then((response: any) => {
//             res.send(JSON.parse((response.body as string)))
//         }).catch(err => {
//             console.log('dynamic/article\n', err)
//             res.status(500)
//         })
//     } else {
//         res.status(412)
//     }
// })
// router.get('/dynamic/live', (req, res) => {
//     const cookie = 'SESSDATA=' + req.cookies['SESSDATA']
//     aioRequest.get(dynamic.live, { cookie }).then((response: any) => {
//         res.send(JSON.parse((response.body as string)))
//     }).catch(err => {
//         console.log('dynamic/live\n', err)
//         res.status(500)
//     })
// })
exports.default = router;
