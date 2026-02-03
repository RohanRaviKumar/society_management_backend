import "dotenv/config";
import { defineConfig, env } from "prisma/config";
import path from "path";

export default defineConfig({
  // Use absolute-style pathing to avoid confusion during migrations
  schema: "./src/prisma/schema.prisma", 
  
  migrations: {
    path: "./prisma/migrations",
  },
  
  datasource: {
    url: env("DATABASE_URL"),
  },

  // Removing engine: "classic" to let Prisma choose the best 
  // library/binary for your current OS/Supabase connection.
});