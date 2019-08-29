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
const utilController = require("./controllers/utilController");
const teacherController_1 = require("./controllers/teacherController");
const authController_1 = require("./controllers/authController");
const checkJwt_1 = require("./middlewares/checkJwt");
dotenv.config();
class MyApplication {
    constructor() {
        this._express = express();
        this.port = parseInt(process.env.PORT);
        this.appMiddlewares();
        this.devRoutes();
        this.appRoutes();
        this.conn();
        this._express.listen(this.port, () => {
            console.log(process.env.APP_NAME + ', Started At:' + this.port);
        });
    }
    insertFakeData() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(' insertFakeData() Method');
            let teachers = yield utilController.getCsvData('teachers.csv').then(data => data);
            let students = yield utilController.getCsvData('students.csv').then(data => data);
            // console.log(teachers[1])
            const con = typeorm_1.getConnection();
            let teacherRepository = typeorm_1.getRepository(Teacher_1.default);
            let studentRepository = typeorm_1.getRepository(Student_1.default);
            teachers.forEach((teacher) => __awaiter(this, void 0, void 0, function* () {
                let t = yield teacherRepository.save(teacher).catch(e => {
                    console.log(e);
                });
                students.forEach((stud) => __awaiter(this, void 0, void 0, function* () {
                    stud.name = null;
                    stud.enrollment_no = null;
                    stud.teacherid = null;
                    stud.name = 'A-' + Math.floor(Math.random() * (10000000 - 1) + 1);
                    stud.enrollment_no = Math.floor(Math.random() * (10000000 - 1) + 1);
                    stud.teacher = t;
                    console.log(stud);
                    let s = yield studentRepository.save(stud).catch(e => {
                        console.log(e);
                    });
                }));
            }));
            // console.log(await teacherRepository.find())
            // let myTeacher = await con.manager.find(Teacher)
            // console.log(myTeacher)
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
        this._express.use('/api/teachers', checkJwt_1.checkJwt, teacherRoutes_1.default);
        this._express.use('/api/students', checkJwt_1.checkJwt, studentRoutes_1.default);
        this._express.use(checkJwt_1.checkJwt, attendanceRoutes_1.default);
        this._express.use(checkJwt_1.checkJwt, indexRoutes_1.default);
        this.errorRoutes();
    }
    /**
     * ERROR AND Undefined Routes
     */
    errorRoutes() {
        ////.... IF Request Route not Found.. THRO ERROR
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
                synchronize: true,
            });
            // const tRepo = getRepository(Teacher);
            // const teachers = await tRepo.find();
            // console.log(teachers);
        });
    }
    /**
     * Only Dev Routes for Testing and Creating Record without Login etc
     */
    devRoutes() {
        return __awaiter(this, void 0, void 0, function* () {
            if (process.env.NODE_ENV === 'dev') {
                this._express.post('/api/teachers', teacherController_1.default.create);
            }
            // await getRepository('teacher').save([...itemList], { chunk: 500 })
        });
    }
}
let app = new MyApplication();
// app.insertFakeData()
exports.default = app;
//# sourceMappingURL=index.js.map