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
const typeorm_1 = require("typeorm");
const jwt = require("jsonwebtoken");
const Teacher_1 = require("../entity/Teacher");
class AuthController {
    constructor() {
        this.loginView = (req, res) => {
            res.render('teacher_login');
        };
        this.loginAuth = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            console.log('LoginAuth 1');
            //Check if username and password are set
            let { username, password } = req.body;
            if (!(username && password)) {
                console.log('Username, Password not Available');
                res.status(400).send('');
                // return;
            }
            console.log('LoginAuth 2');
            const teacherRepository = typeorm_1.getRepository(Teacher_1.default);
            let teacher;
            //Get teacher from database
            try {
                teacher = yield teacherRepository.findOneOrFail({ where: { username } });
                //Check if encrypted password match
                if (!teacher.unencrypted_password_is_valid(password)) {
                    res.status(401).render('teacher_login', {
                        error: 'Username, password not existed'
                    });
                    return;
                }
                //Sing JWT, valid for 1 hour
                const jwtToken = jwt.sign({ id: teacher.id, username: teacher.username, roll: teacher.roll }, process.env.JWT_TOKEN, { expiresIn: process.env.JWT_TOKEN_EXPIRES_IN_HOUR });
                // res.setHeader('jwt', jwtToken)
                /// Creating Cookie for Auth
                res.cookie('jwt', jwtToken, {
                    expires: new Date(Date.now() + process.env.JWT_TOKEN),
                    // secure:true,
                    httpOnly: true
                });
                //Send the jwt in the response
                // res.send(teacher)
                res.redirect('/index');
            }
            catch (error) {
                console.log('LoginAuth Catch (Error)');
                res.status(401).render('teacher_login', {
                    error: 'Username, password not existed'
                });
                // res.status(401).render('errors/404');
            }
            // res.status(401).render('teacher_login', {
            //   error: 'Username, password not existed'
            // });
        });
        this.logout = (req, res) => {
            res.clearCookie('jwt');
            res.clearCookie('user');
            res.render('teacher_login');
        };
        this.getRoll = (req, res) => { };
    }
}
exports.default = new AuthController();
//# sourceMappingURL=authController.js.map