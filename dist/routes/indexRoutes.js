"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const checkRoll_1 = require("./../middlewares/checkRoll");
let route = express_1.Router();
route.get('/test', (req, res) => __awaiter(this, void 0, void 0, function* () {
    res.send('test. INdex ROuts');
}));
route.get('/', (req, res) => {
    res.render('index');
});
route.get('/teacher_registration', checkRoll_1.isPrinciple, (req, res) => {
    res.render('teacher_registration');
});
route.get('/registration', (req, res) => {
    res.render('student_registration', { teacherId: res.locals.id });
});
route.get('/index', (req, res) => {
    res.render('index');
});
route.get('/dashboard', (req, res) => {
    res.render('dashboard');
});
exports.default = route;
//# sourceMappingURL=indexRoutes.js.map