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
const Attendance_1 = require("../entity/Attendance");
const typeorm_1 = require("typeorm");
class DashboadController {
    constructor() {
        this.dashboard = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            let data;
            let attendanceRepository = typeorm_1.getRepository(Attendance_1.default);
            data = yield attendanceRepository.find({ relations: ['student'] });
            res.render('dashboard', { data });
        });
        this.getAttendaceWithStudent = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            let attendanceRepository = typeorm_1.getRepository(Attendance_1.default);
            let data = yield attendanceRepository.find({
                relations: ['student'],
                where: { teacher_id: res.locals.id }
            });
            res.send(data);
            // res.send(students)
        });
    }
}
exports.default = new DashboadController();
//# sourceMappingURL=dashboardController.js.map