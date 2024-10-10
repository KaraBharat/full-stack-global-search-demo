import { relations, sql } from "drizzle-orm";
import {
  boolean,
  integer,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

/**
 * Global Search Index Table
 * Represents the structure for storing searchable items across the application.
 */
export const GlobalSearchIndex = pgTable("global_search_index", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  type: varchar("type", { length: 50 }).notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  tags: text("tags").array(),
  date: timestamp("date").notNull(),
  status: varchar("status", { length: 50 }).notNull().default("active"),
  breadcrumbs: text("breadcrumbs").array(),
  url: varchar("url", { length: 255 }),
  trending: boolean("trending").default(false),
  trendingRank: integer("trending_rank"),
});

/**
 * Global Search Index Relations
 * Currently empty, but can be extended for future relational mappings.
 */
export const globalSearchIndexRelations = relations(GlobalSearchIndex, () => ({}));

/**
 * Zod Schemas for Global Search Index
 * Used for type-safe insertions and selections.
 */
export const insertGlobalSearchIndexSchema = createInsertSchema(GlobalSearchIndex);
export const selectGlobalSearchIndexSchema = createSelectSchema(GlobalSearchIndex);