"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = __importDefault(require("chai"));
const chai_http_1 = __importDefault(require("chai-http"));
const server_1 = __importDefault(require("../../server"));
const { expect } = chai_1.default;
chai_1.default.use(chai_http_1.default);
chai_1.default.should();
describe("Access to root file endpoint", () => {
    it("You've reached the root GET endpoint", (done) => {
        chai_1.default
            .request(server_1.default)
            .get("/api/v1")
            .end((_err, res) => {
            expect(res).to.have.status(200);
            expect(res.body.status).to.equal("success");
            expect(res.body.message).to.equal("We've returned the generic endpoint.");
            done();
        });
    });
    it("You've navigated to an endpoint that doesn't exist.", (done) => {
        chai_1.default
            .request(server_1.default)
            .get("/doesnotexist")
            .end((_err, res) => {
            expect(res).to.have.status(404);
            done();
        });
    });
});
