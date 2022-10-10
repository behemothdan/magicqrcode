import chai from "chai";
import chaiHttp from "chai-http";
import server from "../../server";

const { expect } = chai;
chai.use(chaiHttp);
chai.should();

/**
 * In these tests, the definition of a valid URL is one
 * that passes our validateUrls RegEx statement indicating
 * that it is structured properly. It may not actually lead
 * to a real website but they could.
 */
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
			.send({ "decklists": [{ "url": "https://www.moxfield.com/decks/jAS0WPfBt0CKyATKXvMS0g" }] })
			.end((_err, res) => {
				expect(res).to.have.status(200);
				done();
			});
	})
	it("You posted a valid URL to the generateqr endpoint with optional fields", (done) => {
		chai
			.request(server)
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
	})
	it("You posted multiple valid URLs to the generateqr endpoint", (done) => {
		chai
			.request(server)
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
	})
	it("You posted a valid URL and an invalid URL to the generateqr endpoint", (done) => {
		chai
			.request(server)
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
	})
	it("You posted an invalid URL to the generateqr endpoint", (done) => {
		chai
			.request(server)
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
				expect(res.body).to.have.property('feedback','No QR codes were generated. Please check the URLs and try again.');
				done();
			});
	})
	it("You posted multiple invalid URL to the generateqr endpoint", (done) => {
		chai
			.request(server)
			.post("/api/v1/generateqr")
			.set('content-type', 'application/json')
			.send({
				"decklists": [
					{
						"color": "#FF0000",
						"commander": "Yawgmoth, Thran Physician",
						"url": "hahaIamnotaURL"
					},
					{
						"color": "#0000FF",
						"commander": "Sisay and Jeggy",
						"url": "I am not a URL and I have spaces!"
					}
				]
			})
			.end((_err, res) => {
				expect(res.body).to.have.property('feedback','No QR codes were generated. Please check the URLs and try again.');
				done();
			});
	})
});