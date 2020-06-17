"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SESSION_OPTION = void 0;
const app_1 = require("./app");
const { SESSION_SECRET = `cattt hell`, SESSION_NAME = `sid`, SESSION_IDLE_TIMEOUT = `HALF_HOUR`, } = process.env;
exports.SESSION_OPTION = {
    secret: SESSION_SECRET,
    name: SESSION_NAME,
    cookie: {
        maxAge: +SESSION_IDLE_TIMEOUT,
        secure: app_1.IN_PROD,
        sameSite: true
    },
    rolling: true,
    saveUninitialized: false,
    resave: false
};
