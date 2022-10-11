import compression from "compression";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import serverless from 'serverless-http';

/**
 * Define our application and the
 * middleware it is going to use
 * when is is added to the server.
 */
const app = express();
dotenv.config();

/**
 * Approved domains to access the API.
 * Add whatever domains you want to allow.
 */
const allowedOrigins = ["http://localhost:3000", "http://localhost:3001", "https://mqr.behemothdan.dev"];

/**
 * This uses the above array of domains and validates
 * against that list and also checks to see if it
 * has no origin either, such as Postman or Insomnia.
 * For production we will want to remove the !origin
 * option for security reasons.
 */
const corsOptions = {
	origin(origin: any, callback: any) {
		if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
			callback(null, true);
		} else {
			callback(new Error("Access Denied."));
		}
	}
};

/**
 * This verifies that the host calling the API
 * is in the approved list of domains listed above.
 */
app.use(cors(corsOptions));

/** Body Parser is included in expressjs so we
 * do not to install it separately.
 */
app.use(express.json());

/**
 * This is to Gzip files to make things even faster!
 */
app.use(compression());

const router = express.Router();

/**
 * Route files pulled from the index
 * within the routes folder so we can
 * keep this file cleaner.
 */
import routes from "./routes/index";

/**
 * Implement the route files with our instance of router
 */
router.use("/", routes);

/**
 * We will use a version tag here in case we get ambitious
 */
app.use("/api/v1/", router);

/**
 * Get the desired port from the env file or fallback
 * to port 8080 if it does not exist.
 */
const port = process.env.PORT || 8080;

const server = app.listen(port, (): void =>
	// tslint:disable-next-line:no-console
	console.log(`🚀: API ready at http://localhost:${port}`)
);
export default server;

module.exports.handler = serverless(app, {
	/**
	 * At the moment, this appears to have worked for at least a UI
	 * running locally and hitting it from Insomnia. Redeploying the
	 * UI to see if I have unstaged changes.
	 */
	binary: ['application/pdf', 'application/json']
});
