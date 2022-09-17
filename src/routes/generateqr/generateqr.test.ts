import chai from "chai";
import chaiHttp from "chai-http";
import server from "../../server";

const { expect } = chai;
chai.use(chaiHttp);
chai.should();

describe("Testing generateqr endpoints", () => {
	it("You've reached the generateqr GET endpoint for the API", (done) => {
		chai
			.request(server)
			.get("/api/v1/generateqr")
			.end((_err, res) => {
				expect(res).to.have.status(200);
				expect(res.body.status).to.equal("success");
				expect(res.body.message).to.equal(
					"We've successfully hit the generateqr GET endpoint."
				);
				done();
			});
	});
	it("You posted a valid URL to the generateqr endpoint", (done) => {
		chai
			.request(server)
			.post("/api/v1/generateqr")
			.set('content-type', 'application/json')
			.send({ "url": "https://www.moxfield.com/decks/jAS0WPfBt0CKyATKXvMS0g" })
			.end((_err, res) => {
				expect(res).to.have.status(200);
				done();
			});
	})
	it("You posted multiple valid URLs to the generateqr endpoint", (done) => {
		chai
			.request(server)
			.post("/api/v1/generateqr")
			.set('content-type', 'application/json')
			.send({ "url": "https://www.moxfield.com/decks/jAS0WPfBt0CKyATKXvMS0g,https://www.moxfield.com/decks/qYImBuPX8Ee2256k0kGI5Q,https://www.moxfield.com/decks/FLgGtSxE1U60V4mLbBPSLw" })
			.end((_err, res) => {
				expect(res).to.have.status(200);
				done();
			});
	})
	it("You posted multiple valid URLs and an invalid URL to the generateqr endpoint", (done) => {
		chai
			.request(server)
			.post("/api/v1/generateqr")
			.set('content-type', 'application/json')
			.send({ "url": "https://www.moxfield.com/decks/jAS0WPfBt0CKyATKXvMS0g,https://www.moxfield.com/decks/qYImBuPX8Ee2256k0kGI5Q,https://www.moxfield.com/decks/FLgGtSxE1U60V4mLbBPSLw,notavalidurl" })
			.end((_err, res) => {
				expect(res).to.have.status(200);
				done();
			});
	})
	it("You posted an invalid URL to the generateqr endpoint", (done) => {
		chai
			.request(server)
			.post("/api/v1/generateqr")
			.set('content-type', 'application/json')
			.send({ "url": "not-a-valid-url" })
			.end((_err, res) => {
				expect(res.text).to.equal("No QR codes generated.");
				done();
			});
	})
});