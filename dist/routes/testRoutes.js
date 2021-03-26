"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const testController_1 = require("./../controllers/testController");
let route = express_1.Router();
route.get('/test', testController_1.default.index);
exports.default = route;
//# sourceMappingURL=testRoutes.js.map