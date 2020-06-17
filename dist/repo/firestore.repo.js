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
Object.defineProperty(exports, "__esModule", { value: true });
class FirestoreRepo {
    constructor(db, collectionName) {
        this.collection = db.collection(collectionName);
    }
    readOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.collection.doc(id);
            }
            catch (error) {
                throw new Error("Method not implemented.");
            }
        });
    }
    create(object) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.collection.add(object);
            }
            catch (error) {
                throw new Error("Method not implemented.");
            }
        });
    }
    readAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.collection.get();
            }
            catch (error) {
                throw new Error("Method not implemented.");
            }
        });
    }
    update(id, object) {
        return __awaiter(this, void 0, void 0, function* () {
            const ref = this.collection.doc(id);
            try {
                if (!(yield ref.get()).exists) {
                    return Promise.reject(ref);
                }
                yield ref.update(object);
                return ref;
            }
            catch (error) {
                throw new Error("Method not implemented.");
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const ref = this.collection.doc(id);
            try {
                if (!(yield ref.get()).exists) {
                    return Promise.reject(ref);
                }
                yield ref.delete();
                return ref;
            }
            catch (error) {
                throw new Error("Method not implemented.");
            }
        });
    }
}
exports.default = FirestoreRepo;
