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
/////  if 3rd param is next() & jwt cookie token is NOT valid then just redirected to LoginPage
exports.checkJwt = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    try {
        _checkJwt(req, res, next);
    }
    catch (error) {
        res.status(401).render('errors/404');
    }
});
/////  if 3rd param is 'redirect' & if jwt cookie token is valid then just redirected to home page
exports.isLogged = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    try {
        _checkJwt(req, res, 'redirect');
    }
    catch (error) {
        res.status(401).render('errors/404');
    }
});
//////// Method  created Code Reusablity of ChecKJWT & isLogged both method using 95% same Code
const _checkJwt = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    //Get the jwt token from the head
    // const token = <string>req.headers['auth']
    let jwtCookieToken = req.cookies.jwt;
    let jwtPayload;
    // console.log(jwtCookieToken)
    //Try to validate the token and get data
    try {
        jwtPayload = yield jwt.verify(jwtCookieToken, process.env.JWT_TOKEN);
        res.locals.jwtPayload = jwtPayload;
    }
    catch (err) {
        // If token is not valid, respond with 401 (unauthorized)
        // Throw an error just in case anything goes wrong with verification
        res.status(401).render('teacher_login', { error: '401 (unauthorized), Please login first' });
        // throw new Error(err)
        return;
    }
    // The token is valid for 1 hour
    // We want to send a new token on every request
    const { id, username, roll } = jwtPayload;
    //Sing JWT, valid for 1 hour
    const jwtToken = jwt.sign({ id, username, roll }, process.env.JWT_TOKEN, {
        expiresIn: process.env.JWT_TOKEN_EXPIRES_IN_HOUR,
    });
    // // res.setHeader('jwt', jwtToken)
    /// creating Cookie in Client machine for Auth
    res.cookie('jwt', jwtToken, {
        expires: new Date(Date.now() + process.env.JWT_TOKEN),
        // secure:true,
        httpOnly: true,
    });
    /// creating Cookie of Logged user Details in claint machine
    res.cookie('username', username);
    res.cookie('teacher_id', id);
    res.locals.username = username;
    res.locals.id = id;
    res.locals.roll = roll;
    //Call the next middleware or controller
    if (next == 'redirect') {
        res.redirect('index');
    }
    else {
        next();
    }
});
//# sourceMappingURL=checkJwt.js.map