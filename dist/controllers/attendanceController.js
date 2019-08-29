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
const Student_1 = require("../entity/Student");
class AttendanceController {
    constructor() {
        this.attendaceView = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const students = yield this.getStudentJson(req, res);
            // console.log(students)
            res.render('attendance', { students });
        });
        this.getStudentJson = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const studentRepository = typeorm_1.getRepository(Student_1.default);
            const students = yield studentRepository.find({
                where: { teacher: res.locals.id },
            });
            return students;
        });
        this.test = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            res.send('test Attedance');
            // res.send(students)
        });
    }
}
exports.default = new AttendanceController();
//# sourceMappingURL=attendanceController.js.map