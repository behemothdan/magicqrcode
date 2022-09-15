import chai from "chai";
import chaiHttp from "chai-http";
import app from "../../server";

const { expect } = chai;
chai.use(chaiHttp);

chai.should();

describe("Magic QR Code API Testing", () => {
	it("You've reached the generic endpoint for the API", (done) => {
		chai
			.request(app)
			.get("/api/v1")
			.end((_err, res) => {
				expect(res).to.have.status(200);
				expect(res.body.status).to.equal("success");
				expect(res.body.message).to.equal(
					"We've returned the generic endpoint."
				);
				done();
			});
	});

	it("You've navigated to an endpoint that doesn't exist.", (done) => {
		chai
			.request(app)
			.get("/api/v1/doesnotexist")
			.end((_err, res) => {
				expect(res).to.have.status(404);
				done();
			});
	});
});