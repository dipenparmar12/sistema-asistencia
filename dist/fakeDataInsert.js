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
const Student_1 = require("./entity/Student");
const Teacher_1 = require("./entity/Teacher");
const utilController = require("./controllers/utilController");
class FakeData {
    insertFakeData(isStudentInsert = true, studentCount = 3) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('insertFakeData() Method');
            let teachers = yield utilController
                .getCsvData('teachers.csv')
                .then(data => data);
            let students = yield utilController
                .getCsvData('students.csv')
                .then(data => data);
            // console.log(teachers[1])
            const con = typeorm_1.getConnection();
            let teacherRepository = typeorm_1.getRepository(Teacher_1.default);
            let studentRepository = typeorm_1.getRepository(Student_1.default);
            teachers.forEach((teacher) => __awaiter(this, void 0, void 0, function* () {
                let t = yield teacherRepository.save(teacher).catch(e => {
                    console.log(e);
                });
                if (isStudentInsert) {
                    let counter = 0;
                    students.forEach((stud) => __awaiter(this, void 0, void 0, function* () {
                        counter += 1;
                        if (counter < studentCount) {
                            stud.name = null;
                            stud.enrollment_no = null;
                            stud.teacherid = null;
                            stud.name = 'A-' + Math.floor(Math.random() * (10000000 - 1) + 1);
                            stud.enrollment_no = Math.floor(Math.random() * (10000000 - 1) + 1);
                            stud.teacher = t;
                            // console.log(stud);
                            let s = yield studentRepository.save(stud).catch(e => {
                                console.log(e);
                            });
                        }
                    }));
                }
            }));
            // console.log(await teacherRepository.find())
            // let myTeacher = await con.manager.find(Teacher)
            // console.log(myTeacher)
        });
    }
}
//# sourceMappingURL=fakeDataInsert.js.map