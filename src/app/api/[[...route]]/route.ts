import { Hono } from "hono";
import { handle } from "hono/vercel";
import globalSearch from "./global-search";

/**
 * API Route Configuration
 */

// Set the runtime to edge for better performance
export const runtime = "edge";

// Initialize Hono app with base path
const app = new Hono().basePath("/api");

// Define routes
const routes = app.route("/global-search", globalSearch);

/**
 * HTTP Method Handlers
 * These handlers are used by Vercel to route incoming requests to the Hono app
 */
export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

/**
 * Type definition for the app routes
 * This can be used for type-safe access to the API routes in other parts of the application
 */
export type AppType = typeof routes;