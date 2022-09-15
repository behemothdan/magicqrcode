import { Router } from "express";

const routes = Router();

/**
 * Route files
 * All route files should live
 * in their own directory along
 * with their corresponding test files.
 */
import healthcheck from "./healthcheck/healthcheck";
import root from "./root/root";

/**
 * Implement the route files with our instance of router.
 * New routes will be added here instead of within the
 * main server.ts file for cleanliness.
 */
routes.use("/healthcheck", healthcheck);
routes.use("/", root);

export default routes;