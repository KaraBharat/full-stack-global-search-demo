import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { db } from "@/database/drizzle";
import { GlobalSearchIndex } from "@/database/schema";
import { and, desc, eq, asc, sql } from "drizzle-orm";
import {
  FetchSearchItemsResponse,
  SearchItem,
  SearchItemStatus,
  SearchItemType,
} from "@/types/global-search";

/**
 * Global Search API
 * Handles search requests with filtering, pagination, and sorting capabilities.
 */
const app = new Hono().get(
  "/",
  zValidator(
    "query",
    z.object({
      searchTerm: z.string().optional(),
      filter: z.string().optional(),
      cursor: z.string().optional(),
      limit: z.coerce.number().positive().default(10),
      trending: z
        .string()
        .transform((val) => val === "true")
        .optional(),
    }),
  ),
  async (c) => {
    try {
      const { searchTerm, filter, cursor, limit, trending } =
        c.req.valid("query");

      // Initialize base query
      let baseQuery = db.select().from(GlobalSearchIndex);

      // Apply filters
      const conditions = [];

      if (filter && filter !== "all") {
        conditions.push(eq(GlobalSearchIndex.type, filter));
      }

      if (trending) {
        conditions.push(eq(GlobalSearchIndex.trending, true));
      }

      if (searchTerm) {
        conditions.push(
          sql`((${GlobalSearchIndex.name} ILIKE ${`%${searchTerm}%`}) OR (${
            GlobalSearchIndex.description
          } ILIKE ${`%${searchTerm}%`}))`,
        );
      }

      if (conditions.length > 0) {
        baseQuery = baseQuery.where(and(...conditions)) as typeof query;
      }

      // Get total count
      const [{ count }] = await db
        .select({ count: sql<number>`count(*)` })
        .from(baseQuery.as("subquery"));

      const totalCount = Number(count);

      // Apply sorting
      let query = baseQuery;
      if (trending) {
        query = query.orderBy(
          asc(GlobalSearchIndex.trendingRank),
          desc(GlobalSearchIndex.date),
          asc(GlobalSearchIndex.name),
        ) as typeof query;
      } else {
        query = query.orderBy(
          desc(GlobalSearchIndex.date),
          asc(GlobalSearchIndex.name),
        ) as typeof query;
      }

      // Apply pagination
      query = query.limit(limit + 1) as typeof query; // Fetch one extra to determine if there's a next page

      if (cursor) {
        query = query.offset(parseInt(cursor, 10)) as typeof query;
      }

      const results = await query;

      // Process results
      const hasNextPage = results.length > limit;
      const items = results.slice(0, limit);

      const formattedItems = items.map((item) => ({
        ...item,
        type: item.type as SearchItemType,
        status: item.status as SearchItemStatus,
        date: item.date.toISOString(),
      })) as SearchItem[];

      const nextCursor = hasNextPage
        ? (cursor ? parseInt(cursor, 10) : 0) + limit
        : null;

      // Return formatted response
      return c.json<FetchSearchItemsResponse>({
        items: formattedItems,
        totalCount: totalCount,
        nextCursor: nextCursor ? nextCursor.toString() : null,
      });
    } catch (error) {
      console.error(error);
      return c.json<FetchSearchItemsResponse>({
        items: [],
        totalCount: 0,
        nextCursor: null,
      });
    }
  },
);

export default app;
