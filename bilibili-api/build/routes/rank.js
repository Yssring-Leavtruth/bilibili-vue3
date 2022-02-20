"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
var express_1 = __importDefault(require("express"));
var urlConfig_1 = require("./urlConfig");
var router = express_1.default.Router();
router.get('/rank', function (req, res) {
    var region = req.query.region;
    if (Object.keys(urlConfig_1.rank).indexOf(region) !== -1) {
        var url = Reflect.get(urlConfig_1.rank, region);
        axios_1.default.get(url).then(function (response) {
            res.send(response.data.data);
        }).catch(function (err) {
            console.log('rank', err);
            res.status(500);
        });
    }
    else {
        res.status(404);
    }
});
exports.default = router;
