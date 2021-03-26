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
require("reflect-metadata");
const path = require("path");
const dotenv = require("dotenv");
const helmet = require("helmet");
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const typeorm_1 = require("typeorm");
const Student_1 = require("./entity/Student");
const Attendance_1 = require("./entity/Attendance");
const Teacher_1 = require("./entity/Teacher");
const indexRoutes_1 = require("./routes/indexRoutes");
const teacherRoutes_1 = require("./routes/teacherRoutes");
const studentRoutes_1 = require("./routes/studentRoutes");
const attendanceRoutes_1 = require("./routes/attendanceRoutes");
const dashboardRoutes_1 = require("./routes/dashboardRoutes");
const testRoutes_1 = require("./routes/testRoutes");
const authController_1 = require("./controllers/authController");
const checkJwt_1 = require("./middlewares/checkJwt");
dotenv.config();
class MyApplication {
    constructor() {
        this._express = express();
        this.port = parseInt(process.env.PORT);
        this.appMiddlewares();
        this.appRoutes();
        this.conn();
        this._express.listen(this.port, () => {
            console.log(process.env.APP_NAME + ', Started At:' + this.port);
        });
    }
    /**
     * Express Midallwares & other configration ( Cookies, static path ..etc )
     */
    appMiddlewares() {
        this._express.use(helmet());
        this._express.use(bodyParser.json());
        this._express.use(bodyParser.urlencoded({ extended: false }));
        this._express.use(cookieParser());
        this._express.use('/', express.static(path.join(__dirname, '../public')));
        this._express.set('views', path.join(__dirname, 'views'));
        this._express.set('view engine', 'pug');
    }
    /**
     * Set All Application Routes from External Class's
     */
    appRoutes() {
        this._express.post('/login', authController_1.default.loginAuth);
        this._express.get('/logout', authController_1.default.logout);
        this._express.get('/login', checkJwt_1.isLogged, authController_1.default.loginView);
        this._express.use(testRoutes_1.default);
        this._express.use('/api/teachers', checkJwt_1.checkJwt, teacherRoutes_1.default);
        this._express.use('/api/students', checkJwt_1.checkJwt, studentRoutes_1.default);
        this._express.use(checkJwt_1.checkJwt, attendanceRoutes_1.default);
        this._express.use(checkJwt_1.checkJwt, dashboardRoutes_1.default);
        this._express.use(checkJwt_1.checkJwt, indexRoutes_1.default);
        this.errorRoutes();
    }
    /**
     * ERROR AND Undefined Routes
     */
    errorRoutes() {
        this._express.use((req, res, next) => {
            res.status(404).render('errors/404.pug', { url: req.url });
        });
        this._express.use((err, req, res, next) => {
            res.status(500).send(err.stack);
        });
    }
    /**
     * Database Connection and Configration
     */
    conn() {
        return __awaiter(this, void 0, void 0, function* () {
            this.db = yield typeorm_1.createConnection({
                type: 'mysql',
                host: process.env.DB_HOST,
                username: process.env.DB_USER,
                password: process.env.DB_PASS,
                database: process.env.DB_NAME,
                entities: [Teacher_1.default, Student_1.default, Attendance_1.default],
                synchronize: true
            });
        });
    }
}
let app = new MyApplication();
// app.insertFakeData(true, 3)
exports.default = app;
//# sourceMappingURL=index.js.map