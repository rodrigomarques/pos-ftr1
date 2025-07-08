import { pgTable, varchar, text, timestamp, integer } from "drizzle-orm/pg-core";
import { uuidv7 } from "uuidv7";


export const links = pgTable("links", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => uuidv7()),
  originalUrl: text("original_url").notNull(),
  shortUrl: varchar("short_url", { length: 100 }).notNull().unique(),
  accessCount: integer("access_count").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});