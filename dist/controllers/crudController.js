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
exports.CrudController = void 0;
const typeorm_1 = require("typeorm");
const Teacher_1 = require("../entity/Teacher");
class CrudController {
    constructor() {
        this._data = 'This is CrudController';
    }
    get data() {
        return this._data;
    }
    test(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // console.log(this)
            yield res.send('CRUD Parent this' + this.data);
        });
    }
    getCrud() {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = typeorm_1.getRepository(Teacher_1.default);
            return yield repository.find();
        });
    }
}
exports.CrudController = CrudController;
// export default new CrudController()
//# sourceMappingURL=crudController.js.map