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
const jwt = require("jsonwebtoken");
/////  if 3rd param is 'redirect' & if jwt cookie token is valid then just redirected to home page
exports.isPrinciple = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    try {
        let jwtCookieToken = req.cookies.jwt;
        const JWT_TOKEN = process.env.JWT_TOKEN;
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