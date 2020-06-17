"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const route_1 = __importDefault(require("./route"));
const firestore_db_1 = __importDefault(require("../config/firestore.db"));
const auth_controller_1 = __importDefault(require("../controllers/auth.controller"));
exports.default = new class AuthRoute extends route_1.default {
    myRoutes() {
        this.router.get('/', (req, res) => {
            firestore_db_1.default.collection('pesanan').get().then(data => {
                if (data) {
                    return res.status(200).json("ok");
                }
                res.status(400).json("OK");
                return;
            });
        });
        this.router.post("/login", auth_controller_1.default.login);
        this.router.post("/register", auth_controller_1.default.register);
    }
};
