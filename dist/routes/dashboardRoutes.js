"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dashboardController_1 = require("./../controllers/dashboardController");
let route = express_1.Router();
route.get('/dashboard', dashboardController_1.default.dashboard);
route.get('/getDashboardData', dashboardController_1.default.getAttendaceWithStudent);
exports.default = route;
//# sourceMappingURL=dashboardRoutes.js.map