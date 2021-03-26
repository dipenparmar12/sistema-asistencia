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
const Student_1 = require("../entity/Student");
const Attendance_1 = require("../entity/Attendance");
class AttendanceController {
    constructor() {
        this.attendaceView = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const students = yield this.getStudentJson(req, res);
            res.render('attendance', { students });
            // console.log(students)
            // res.send(students)
        });
        this.getStudentJson = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const studentRepository = typeorm_1.getRepository(Student_1.default);
            const students = yield studentRepository.find({
                where: { teacher: res.locals.id },
            });
            return students;
        });
        this.get_submit_attendance = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            let studentRepository = typeorm_1.getRepository(Student_1.default);
            let attendanceRepository = typeorm_1.getRepository(Attendance_1.default);
            let submited_data = Object.getOwnPropertyNames(req.body);
            let attendanceEntities = submited_data.map((v, i) => __awaiter(this, void 0, void 0, function* () {
                let sid;
                let isPresent;
                if (v.startsWith('student_id=')) {
                    sid = v.slice('student_id='.length);
                    isPresent = req.body[v];
                    let attendanceEntity = new Attendance_1.default();
                    attendanceEntity.student_id = sid;
                    attendanceEntity.present = isPresent;
                    attendanceEntity.teacher_id = res.locals.id;
                    attendanceEntity.date = req.body['date'];
                    attendanceEntity.student = yield studentRepository.findOne(sid);
                    if (attendanceEntity instanceof Attendance_1.default && attendanceEntity != undefined) {
                        // console.log(attendanceEntity)
                        yield attendanceRepository.save(attendanceEntity).then(data => data);
                        return attendanceEntity;
                    }
                }
            }));
            res.locals.success = 'Attendance Successfuly Submited.... Thank you for using our service';
            this.attendaceView(req, res, next);
        });
        this.face = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const students = yield this.getStudentJson(req, res);
            res.render('face', { students });
        });
        this.test = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            res.send('test Attedance');
        });
    }
}
exports.default = new AttendanceController();
//# sourceMappingURL=attendanceController.js.map