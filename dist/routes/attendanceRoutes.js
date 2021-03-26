"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const attendanceController_1 = require("../controllers/attendanceController");
let route = express_1.Router();
route.get('/attendance', attendanceController_1.default.attendaceView);
route.get('/face', attendanceController_1.default.face);
route.post('/attendance', attendanceController_1.default.get_submit_attendance);
exports.default = route;
//# sourceMappingURL=attendanceRoutes.js.map