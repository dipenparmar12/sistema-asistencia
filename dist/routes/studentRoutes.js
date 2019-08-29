"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const studentController_1 = require("../controllers/studentController");
const util = require("./../controllers/utilController");
let router = express_1.Router();
router
    .get('/', studentController_1.default.getAll)
    .post('/', util.upload, studentController_1.default.create)
    .get('/:id', studentController_1.default.getOneById)
    .patch('/:id', studentController_1.default.update)
    .delete('/:id', studentController_1.default.destroy);
exports.default = router;
//# sourceMappingURL=studentRoutes.js.map