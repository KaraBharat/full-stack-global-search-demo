CREATE TABLE IF NOT EXISTS "global_search_index" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"type" varchar(50) NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" text,
	"tags" text[],
	"date" timestamp NOT NULL,
	"status" varchar(50) DEFAULT 'active' NOT NULL,
	"breadcrumbs" text[],
	"url" varchar(255),
	"trending" boolean DEFAULT false,
	"trending_rank" integer
);
