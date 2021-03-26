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
const Student_1 = require("../entity/Student");
const Attendance_1 = require("../entity/Attendance");
const typeorm_1 = require("typeorm");
class TestController {
    constructor() {
        this.index = (req, res) => __awaiter(this, void 0, void 0, function* () {
            let data;
            let sr = typeorm_1.getRepository(Student_1.default);
            let ar = typeorm_1.getRepository(Attendance_1.default);
            // data = await sr.find({ relations: ['attendances'] })
            data = yield ar.find({ relations: ['student'] });
            res.send(data);
        });
    }
}
exports.default = new TestController();
// export let age: number = 20;
// export class Emp {
// 	eCode: number;
// 	eName: string;
// 	constructor(name: string, code: number) {
// 		this.eName = name
// 		this.eCode = eCode;
// 	}
// 	print() {
// 		console.log(`E code: ${this.eCode} E Name: ${this.eName}`)
// 	}
// }
// let Ename = New Emp(1, 'Dipends')
//# sourceMappingURL=testController.js.map