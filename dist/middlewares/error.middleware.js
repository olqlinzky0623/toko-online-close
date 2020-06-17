"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ErrorHandle = (err, req, res, next) => {
    const error = err;
    res.status(error.status || 500).json({
        msg: error.message,
        status: error.status
    });
};
exports.default = ErrorHandle;
