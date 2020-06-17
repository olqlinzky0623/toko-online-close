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
const firestore_repo_1 = __importDefault(require("../repo/firestore.repo"));
const firestore_db_1 = __importDefault(require("../config/firestore.db"));
class Controller {
    constructor(collectionName) {
        this.firestore = new firestore_repo_1.default(firestore_db_1.default, collectionName);
    }
    readOne(req) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.params.id == null) {
                console.log(true);
                const err = new Error("Request ID Invalid ");
                err.status = 400;
                return Promise.reject(err);
            }
            return yield this.firestore.readOne(req.params.id)
                .then(data => {
                return data.get().then(docs => {
                    var _a, _b;
                    if (!docs.exists) {
                        const err = new Error("Data Kosong");
                        err.status = 200;
                        return Promise.reject(err);
                    }
                    return {
                        id: docs.id,
                        data: docs.data(),
                        createdAt: (_a = docs.createTime) === null || _a === void 0 ? void 0 : _a.toDate(),
                        updatedAt: (_b = docs.updateTime) === null || _b === void 0 ? void 0 : _b.toDate()
                    };
                });
            }).catch(error => {
                return error;
            });
        });
    }
    readAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.firestore.readAll().then((list) => __awaiter(this, void 0, void 0, function* () {
                if (list.empty) {
                    const err = new Error("Data Kosong");
                    err.status = 200;
                    return Promise.reject(err);
                }
                return yield list.docs.map(data => {
                    return {
                        id: data.id,
                        data: data.data(),
                        createdAt: data.createTime.toDate(),
                        updatedAt: data.updateTime.toDate()
                    };
                });
            })).catch(error => {
                return error;
            });
        });
    }
    create(req) {
        if (req.body == null) {
            const err = new Error("Request Invalid");
            err.status = 400;
            return Promise.reject(err);
        }
        return this.firestore.create(req.body).then(() => {
            Promise.resolve("Data Berhasil di Buat !!");
        }).catch(error => {
            return error;
        });
    }
    update(req) {
        if (req.body && req.params.id == null) {
            const err = new Error("Request Invalid");
            err.status = 400;
            return Promise.reject(err);
        }
        return this.firestore.update(req.params.id, req.body).then(() => {
            Promise.resolve("Data Berhasil Di Update !!");
        }).catch(error => {
            return error;
        });
    }
    delete(req) {
        if (req.params.id == null) {
            const err = new Error("Request Invalid");
            err.status = 400;
            return Promise.reject(err);
        }
        return this.firestore.delete(req.params.id).then(doc => {
            Promise.resolve("Data Berhasil Di Hapus !!");
        }).catch(error => {
            return error;
        });
    }
}
exports.default = Controller;
