import "dotenv/config";
import { defineConfig } from "prisma/config";
import * as path from "path";

export default defineConfig({
    schema: path.join(__dirname, "prisma/schema.prisma"),
    datasource: {
        url: process.env.DATABASE_URL,
    },
});
