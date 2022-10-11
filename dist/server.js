"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const serverless_http_1 = __importDefault(require("serverless-http"));
const app = (0, express_1.default)();
dotenv_1.default.config();
const allowedOrigins = ["http://localhost:3000", "http://localhost:3001", "https://mqr.behemothdan.dev"];
const corsOptions = {
    origin(origin, callback) {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        }
        else {
            callback(new Error("Access Denied."));
        }
    }
};
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
app.use((0, compression_1.default)());
const router = express_1.default.Router();
const index_1 = __importDefault(require("./routes/index"));
router.use("/", index_1.default);
app.use("/api/v1/", router);
const port = process.env.PORT || 8080;
const server = app.listen(port, () => console.log(`🚀: API ready at http://localhost:${port}`));
exports.default = server;
module.exports.handler = (0, serverless_http_1.default)(app, {
    binary: ['application/pdf', 'application/json']
});
