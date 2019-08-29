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
const typeorm_1 = require("typeorm");
const jwt = require("jsonwebtoken");
const Teacher_1 = require("../entity/Teacher");
class AuthController {
    constructor() {
        this.loginView = (req, res) => {
            res.render('teacher_login');
        };
        this.loginAuth = (req, res) => __awaiter(this, void 0, void 0, function* () {
            //Check if username and password are set
            let { username, password } = req.body;
            if (!(username && password)) {
                res.status(400).send();
                return;
            }
            const teacherRepository = typeorm_1.getRepository(Teacher_1.default);
            let teacher;
            //Get teacher from database
            try {
                teacher = yield teacherRepository.findOneOrFail({ where: { username } });
            }
            catch (error) {
                res.status(401).send();
            }
            //Check if encrypted password match
            if (!teacher.unencrypted_password_is_valid(password)) {
                res.status(401).send();
                return;
            }
            //Sing JWT, valid for 1 hour
            const jwtToken = jwt.sign({ id: teacher.id, username: teacher.username, roll: teacher.roll }, process.env.JWT_TOKEN, { expiresIn: process.env.JWT_TOKEN_EXPIRES_IN_HOUR });
            ///// Saving JwtToken in DB
            // teacher.is_logged = jwtToken
            // await teacherRepository.save(teacher)
            // res.setHeader('jwt', jwtToken)
            /// Creating Cookie for Auth
            res.cookie('jwt', jwtToken, {
                expires: new Date(Date.now() + process.env.JWT_TOKEN),
                // secure:true,
                httpOnly: true,
            });
            //Send the jwt in the response
            // res.send(teacher)
            res.redirect('/index');
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