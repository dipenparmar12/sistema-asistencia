"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPrinciple = void 0;
const jwt = require("jsonwebtoken");
/////  if 3rd param is 'redirect' & if jwt cookie token is valid then just redirected to home page
exports.isPrinciple = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let jwtCookieToken = req.cookies.jwt;
        let decoded_jwtCookieToken = yield jwt.decode(jwtCookieToken);
        if (decoded_jwtCookieToken.roll == 'principle') {
            next();
        }
        else {
            res.redirect('/login');
        }
    }
    catch (error) {
        res.status(401).render('errors/404');
        return false;
    }
});
//# sourceMappingURL=checkRoll.js.map