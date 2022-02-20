"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
router.get('/logout', function (req, res) {
    for (var i in req.cookies) {
        res.cookie(i, req.cookies[i], { maxAge: -1 });
    }
    res.send();
});
exports.default = router;
