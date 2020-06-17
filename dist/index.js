"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const compression_1 = __importDefault(require("compression"));
const helmet_1 = __importDefault(require("helmet"));
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const error_middleware_1 = __importDefault(require("./middlewares/error.middleware"));
const app = express_1.default();
const PORT = process.env.PORT || 5000;
process.env.NODE_ENV == "development" ? (app.use(morgan_1.default('dev'))) : [];
app.use(cors_1.default());
app.use(compression_1.default());
app.use(helmet_1.default({
    hidePoweredBy: true,
    frameguard: true
}));
app.use(express_1.default.json());
app.use("/", (req, res) => {
    res.send("Well done ==========================");
});
app.use('/api/auth', auth_route_1.default.router);
app.use(error_middleware_1.default);
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});
