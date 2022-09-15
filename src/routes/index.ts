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
 * The reason we use the routes.use instead of the pattern
 * routes.get(/route, routefile) is that by using the .use
 * it defers to the file to check what path it matches.
 */
routes.use(healthcheck);
routes.use(root);

export default routes;