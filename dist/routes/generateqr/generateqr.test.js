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
    it("You posted a valid URL to the generateqr endpoint", (done) => {
        chai_1.default
            .request(server_1.default)
            .post("/api/v1/generateqr")
            .set('content-type', 'application/json')
            .send({ "decklists": [{ "url": "https://www.moxfield.com/decks/jAS0WPfBt0CKyATKXvMS0g" }] })
            .end((_err, res) => {
            expect(res).to.have.status(200);
            done();
        });
    });
    it("You posted a valid URL to the generateqr endpoint with optional fields", (done) => {
        chai_1.default
            .request(server_1.default)
            .post("/api/v1/generateqr")
            .set('content-type', 'application/json')
            .send({
            "decklists": [{
                    "color": "#FF0000",
                    "commander": "Yawgmoth",
                    "url": "https://www.moxfield.com/decks/jAS0WPfBt0CKyATKXvMS0g",
                }]
        })
            .end((_err, res) => {
            expect(res).to.have.status(200);
            done();
        });
    });
    it("You posted multiple valid URLs to the generateqr endpoint", (done) => {
        chai_1.default
            .request(server_1.default)
            .post("/api/v1/generateqr")
            .set('content-type', 'application/json')
            .send({
            "decklists": [
                {
                    "commander": "Yawgmoth, Thran Physician",
                    "url": "https://www.moxfield.com/decks/jAS0WPfBt0CKyATKXvMS0g",
                },
                {
                    "commander": "Sisay and Jeggy",
                    "url": "https://www.moxfield.com/decks/FLgGtSxE1U60V4mLbBPSLw",
                },
                {
                    "commander": "Urza",
                    "url": "https://www.moxfield.com/decks/jAS0WPfBt0CKyATKXvMS0g",
                },
                {
                    "commander": "Borborygmos Enraged",
                    "url": "https://www.moxfield.com/decks/15HMKmz_Xkae-l9LbuT83A",
                },
                {
                    "commander": "Muerta a la Corona",
                    "url": "https://www.moxfield.com/decks/AVaU-zNgL0KXWJgouAVZvg",
                }
            ]
        })
            .end((_err, res) => {
            expect(res).to.have.status(200);
            done();
        });
    });
    it("You posted a valid URL and an invalid URL to the generateqr endpoint", (done) => {
        chai_1.default
            .request(server_1.default)
            .post("/api/v1/generateqr")
            .set('content-type', 'application/json')
            .send({
            "decklists": [
                {
                    "color": "#FF0000",
                    "commander": "A Broken Commander",
                    "url": "hahaIamnotaURL"
                },
                {
                    "commander": "Yawgmoth, Thran Physician",
                    "url": "https://www.moxfield.com/decks/jAS0WPfBt0CKyATKXvMS0g"
                }
            ]
        })
            .end((_err, res) => {
            expect(res).to.have.status(200);
            done();
        });
    });
    it("You posted an invalid URL to the generateqr endpoint", (done) => {
        chai_1.default
            .request(server_1.default)
            .post("/api/v1/generateqr")
            .set('content-type', 'application/json')
            .send({
            "decklists": [
                {
                    "color": "#FF0000",
                    "commander": "Yawgmoth, Thran Physician",
                    "url": "hahaIamnotaURL"
                }
            ]
        })
            .end((_err, res) => {
            expect(res.text).to.equal("No QR codes were generated. Please check the URLs and try again.");
            done();
        });
    });
});
