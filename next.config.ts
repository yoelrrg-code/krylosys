import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";

const nextConfig: NextConfig = {
  serverExternalPackages: ["@payloadcms/db-postgres", "@payloadcms/db-sqlite", "drizzle-kit", "pg", "drizzle-orm", "payload"],
  transpilePackages: ["@payloadcms/next", "@payloadcms/ui", "@payloadcms/richtext-lexical"],
};

export default withPayload(nextConfig);
