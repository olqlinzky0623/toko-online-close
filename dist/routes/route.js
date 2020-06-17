"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class Route {
    constructor() {
        this.router = express_1.Router();
        this.myRoutes();
    }
}
exports.default = Route;
