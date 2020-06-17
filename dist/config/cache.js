"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.REDIS_OPTION = void 0;
const { REDIS_PORT = 6379, REDIS_HOST = 'localhost', REDIS_PASSWORD = 'secret' } = process.env;
exports.REDIS_OPTION = {
    port: +REDIS_PORT,
    host: REDIS_HOST,
    password: REDIS_PASSWORD
};
