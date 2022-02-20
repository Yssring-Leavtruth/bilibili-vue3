"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var urlConfig_1 = require("./urlConfig");
var axios_1 = __importDefault(require("axios"));
var qs_1 = __importDefault(require("qs"));
var router = express_1.default.Router();
router.post('/getLoginInfo', function (req, res) {
    var oauthKey = req.body.oauthKey;
    if (!oauthKey)
        res.status(400);
    axios_1.default.post(urlConfig_1.loginInfoUrl, qs_1.default.stringify({ oauthKey: oauthKey })).then(function (response) {
        var reslut = response.data;
        if (reslut.status) {
            var cookies = response.headers['set-cookie'];
            cookies === null || cookies === void 0 ? void 0 : cookies.forEach(function (item) {
                var cookie = item.split(';')[0].split('=');
                res.cookie(cookie[0], cookie[1], { maxAge: 31536000 * 1000 });
            });
        }
        res.send(response.data);
    });
});
exports.default = router;
