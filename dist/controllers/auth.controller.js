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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const controller_1 = __importDefault(require("./controller"));
const user_model_1 = __importDefault(require("../models/user.model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class Auth {
    static login(req, res, next) {
        const controller = new controller_1.default(Auth.collection);
        const { username, password } = req.body;
        controller.readAll().then(value => {
            user_model_1.default(req).then(() => __awaiter(this, void 0, void 0, function* () {
                const check = value.find(e => e.data.username == username);
                if (check) {
                    const pass = yield bcrypt_1.default.compare(password, value[0].data.password);
                    if (pass) {
                        const token = yield jsonwebtoken_1.default.sign({ username, password }, "secret", { expiresIn: '1h' });
                        return res.status(200).send(token);
                    }
                    const err = new Error("Password Salah");
                    err.status = 400;
                    return next(err);
                }
                return res.status(404).json({
                    message: "user tidak di temukan !!",
                    status: 404
                });
            })).catch(() => {
                const err = new Error("Format Data Invalid");
                err.status = 400;
                return next(err);
            });
        }).catch(error => {
            return next(error);
        });
    }
    static register(req, res, next) {
        const controller = new controller_1.default(Auth.collection);
        user_model_1.default(req).then(() => __awaiter(this, void 0, void 0, function* () {
            const hash = yield bcrypt_1.default.hash(req.body.password, 10);
            req.body.password = hash;
            controller.create(req).then(() => {
                res.status(200).json("created !");
            }).catch(() => {
                const err = new Error("Format Data Invalid");
                err.status = 400;
                return next(err);
            });
        })).catch(() => {
            const err = new Error("Format Data Invalid");
            err.status = 400;
            return next(err);
        });
    }
}
exports.default = Auth;
Auth.collection = "users";
