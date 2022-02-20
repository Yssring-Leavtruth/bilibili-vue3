"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var aioRequest_1 = __importDefault(require("../utils/aioRequest"));
var urlConfig_1 = require("./urlConfig");
var router = express_1.default.Router();
router.get('/favorite/folder', function (req, res) {
    var cookie = 'SESSDATA=' + req.cookies['SESSDATA'];
    aioRequest_1.default.get(urlConfig_1.favoriteFolderUrl, { cookie: cookie }).then(function (response) {
        res.send(JSON.parse(response.body));
    }).catch(function (err) {
        console.log('favorite/folder\n', err);
        res.status(500);
    });
});
router.get('/favorite', function (req, res) {
    var media_id = req.query.media_id;
    if (media_id) {
        var params = { media_id: media_id };
        var cookie = 'SESSDATA=' + req.cookies['SESSDATA'];
        aioRequest_1.default.get(urlConfig_1.favoriteUrl, { cookie: cookie }, params).then(function (response) {
            res.send(JSON.parse(response.body));
        }).catch(function (err) {
            console.log('favorite\n', err);
            res.status(500);
        });
    }
    else {
        res.status(412);
    }
});
exports.default = router;
