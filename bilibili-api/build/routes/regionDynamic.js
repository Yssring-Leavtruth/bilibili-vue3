"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
var express_1 = __importDefault(require("express"));
var urlConfig_1 = require("./urlConfig");
var router = express_1.default.Router();
router.get('/regionDynamic', function (req, res) {
    var region = req.query.region;
    if (Object.keys(urlConfig_1.regionDynamic).indexOf(region) !== -1) {
        var url = Reflect.get(urlConfig_1.regionDynamic, region);
        var params = {};
        if (region === 'bangumi') {
            var day = new Date().getDay() - 1;
            params.day_before = day != -1 ? day : 6;
        }
        axios_1.default.get(url, { params: params }).then(function (response) {
            res.send(response.data);
        }).catch(function (err) {
            console.log('regionDynamic\n', err);
            res.status(500);
        });
    }
    else {
        res.status(404);
    }
});
exports.default = router;
