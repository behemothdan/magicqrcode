import chai from "chai";
import chaiHttp from "chai-http";
import server from "../../server";

const { expect } = chai;
chai.use(chaiHttp);
chai.should();

describe("Testing healthcheck endpoints", () => {
	it("You've reached the health check GET endpoint for the API", (done) => {
		chai
			.request(server)
			.get("/api/v1/healthcheck")
			.end((_err, res) => {
				expect(res).to.have.status(200);
				expect(res.body.status).to.equal("success");
				expect(res.body.message).to.equal(
					"We've successfully hit the health check endpoint."
				);
				done();
			});
	});
});