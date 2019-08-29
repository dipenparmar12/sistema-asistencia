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
const crudController_1 = require("./crudController");
const Student_1 = require("../entity/Student");
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
const Teacher_1 = require("../entity/Teacher");
class StudentController extends crudController_1.CrudController {
    constructor() {
        super();
        this._temp = 'name';
        this.getAll = (req, res) => __awaiter(this, void 0, void 0, function* () {
            //Get data from database
            const databaseRepository = typeorm_1.getRepository(Student_1.default);
            const data = yield databaseRepository.find({ relations: ['teacher'] });
            //Send the data object
            res.status(200).json({ status: 'success', message: 'Data Found', error: false, data: data });
        });
        this.getOneById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            //Get the ID from the url
            const uuid = req.params.id;
            //Get the data from database
            const databaseRepository = typeorm_1.getRepository(Student_1.default);
            try {
                const data = yield databaseRepository.findOneOrFail(uuid);
                res.status(200).json({ status: 'success', message: 'data found (findById)', error: false, data: data });
            }
            catch (error) {
                res.status(404).send(error);
            }
        });
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            //Get parameters from the body
            let { roll_no, enrollment_no, name, subject, email, mobile, address, teacherId } = req.body;
            let data = new Student_1.default();
            data.roll_no = roll_no;
            data.enrollment_no = enrollment_no;
            data.name = name;
            data.subject = subject;
            data.email = email;
            data.subject = subject;
            data.mobile = mobile;
            data.address = address;
            // data.teacher = teacherId
            /// filename that stored with same_name
            if (req.files.length > 0) {
                data.profile_pic = req.cookies.jwt + '_' + req.files[0].originalname.split('.')[0] + '.jpg';
            }
            // /// Validade if the parameters are ok
            const errors = yield class_validator_1.validate(data);
            if (errors.length > 0) {
                res.status(400).send(errors);
                return;
            }
            //Try to save. If fails, the teachername is already in use
            const databaseRepository = typeorm_1.getRepository(Student_1.default);
            const teacherRepository = typeorm_1.getRepository(Teacher_1.default);
            try {
                ////// for FK, entry will be stored with FK with Logged Teacher
                const loggedTeacher = yield teacherRepository.findOne({ where: { id: res.locals.id } });
                console.log(loggedTeacher);
                //// Relation Maping Table FK with Logged Teacher (ORM)
                data.teacher = loggedTeacher;
                yield databaseRepository.save(data);
            }
            catch (e) {
                res.status(401).render('registration', { errors: e });
                // res.status(401).json({ status: 'fail', message: e.message, error: e, data: false })
                return;
            }
            //If all ok, send 201 response
            res.status(201).redirect('/attendance');
            // res
            // 	.status(201)
            // 	.render('/student_registration', { status: 'success', message: 'Student c', error: false, data: null })
        });
        this.update = (req, res) => __awaiter(this, void 0, void 0, function* () {
            //Get the ID from the url
            const id = req.params.id;
            let data = new Student_1.default();
            //Try to find data on database
            const databaseRepository = typeorm_1.getRepository(Student_1.default);
            try {
                data = yield databaseRepository.findOneOrFail(id);
            }
            catch (error) {
                //If not found, send a 404 response
                res.status(404).send('Student not found');
                return;
            }
            //Validate the new values on model
            let { username, password, name, email, subject, roll } = req.body;
            // data.username = username
            // data.password = password
            // data.name = name
            // data.email = email
            // data.subject = subject
            // data.roll = roll
            const errors = yield class_validator_1.validate(data);
            if (errors.length > 0) {
                res.status(400).send(errors);
                return;
            }
            //Try to safe, if fails, that means teachername already in use
            try {
                yield databaseRepository.save(data);
            }
            catch (e) {
                res.status(409).send('teachername already in use');
                return;
            }
            //After all send a 204 (no content, but accepted) response
            res.status(204).send();
        });
        this.destroy = (req, res) => __awaiter(this, void 0, void 0, function* () {
            //Get the ID from the url
            const id = req.params.id;
            const databaseRepository = typeorm_1.getRepository(Student_1.default);
            let data;
            try {
                data = yield databaseRepository.findOneOrFail(id);
            }
            catch (error) {
                res.status(404).send('Student not found');
                return;
            }
            databaseRepository.delete(id);
            //After all send a 204 (no content, but accepted) response
            res.status(204).send();
        });
        ///////////////////////
        ///////////////
        ////////
        this.getByTeacher = (req, res) => __awaiter(this, void 0, void 0, function* () {
            //Get data from database
            const databaseRepository = typeorm_1.getRepository(Student_1.default);
            const data = yield databaseRepository.find({ teacher: res.locals.id });
            //Send the data object
            res.status(200).json({ status: 'success', message: 'Data Found', error: false, data: data });
        });
    }
}
exports.default = new StudentController();
//# sourceMappingURL=studentController.js.map