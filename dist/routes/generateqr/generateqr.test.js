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
describe("Testing generateqr endpoints", () => {
    it("You've reached the generateqr GET endpoint for the API", (done) => {
        chai_1.default
            .request(server_1.default)
            .get("/api/v1/generateqr")
            .end((_err, res) => {
            expect(res).to.have.status(200);
            expect(res.body.status).to.equal("success");
            expect(res.body.message).to.equal("We've successfully hit the generateqr GET endpoint.");
            done();
        });
    });
    it("You've passed an invalid URL to the generateqr endpoint", (done) => {
        chai_1.default
            .request(server_1.default)
            .post("/api/v1/generateqr")
            .set('content-type', 'application/json')
            .send({ "url": "not-a-valid-url" })
            .end((_err, res) => {
            expect(res).to.equal(null);
            done();
        });
    });
});
