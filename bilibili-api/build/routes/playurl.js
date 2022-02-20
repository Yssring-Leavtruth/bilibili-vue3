"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var urlConfig_1 = require("./urlConfig");
var axios_1 = __importDefault(require("axios"));
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
router.get('/playurl', function (req, res) {
    var query = req.query;
    axios_1.default.get(urlConfig_1.playUrl, { params: query }).then(function (response) {
        res.send(response.data.data.durl[0].url);
    }).catch(function (err) {
        console.log('playurl', err);
        res.status(500);
    });
});
exports.default = router;
