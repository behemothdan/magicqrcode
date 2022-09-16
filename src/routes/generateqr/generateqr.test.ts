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
});