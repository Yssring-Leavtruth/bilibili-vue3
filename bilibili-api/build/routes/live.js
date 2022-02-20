"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
var express_1 = __importDefault(require("express"));
var urlConfig_1 = require("./urlConfig");
var router = express_1.default.Router();
router.get('/live', function (req, res) {
    axios_1.default.get(urlConfig_1.liveUrl).then(function (response) {
        res.send(response.data.data);
    }).catch(function (err) {
        console.log('live\n', err);
        res.status(500);
    });
});
router.get('/live/recommend', function (req, res) {
    axios_1.default.get(urlConfig_1.liveRecommendUrl).then(function (response) {
        res.send(response.data.data.recommend_room_list);
    }).catch(function (err) {
        console.log('live/recommend\n', err);
        res.status(500);
    });
});
exports.default = router;
