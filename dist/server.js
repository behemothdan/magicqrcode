"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const compression_1 = __importDefault(require("compression"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
dotenv_1.default.config();
app.use((0, compression_1.default)());
const port = process.env.PORT || 8080;
const router = express_1.default.Router();
const index_1 = __importDefault(require("./routes/index"));
router.use("/", index_1.default);
app.use("/api", router);
const server = app.listen(port, () => console.log(`🚀: API ready at http://localhost:${port}`));
exports.default = { server, app };
