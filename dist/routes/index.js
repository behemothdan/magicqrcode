"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const routes = (0, express_1.Router)();
const healthcheck_1 = __importDefault(require("./healthcheck/healthcheck"));
const root_1 = __importDefault(require("./root/root"));
routes.use("/healthcheck", healthcheck_1.default);
routes.use("/", root_1.default);
exports.default = routes;
