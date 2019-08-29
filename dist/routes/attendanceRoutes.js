"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const attendanceController_1 = require("../controllers/attendanceController");
let route = express_1.Router();
route.get('/test', attendanceController_1.default.test);
route.get('/attendance', attendanceController_1.default.attendaceView);
exports.default = route;
//# sourceMappingURL=attendanceRoutes.js.map