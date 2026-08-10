import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";

const nextConfig: NextConfig = {
  serverExternalPackages: ["@payloadcms/db-sqlite", "drizzle-kit", "@libsql/client", "payload"],
  transpilePackages: ["@payloadcms/next", "@payloadcms/ui", "@payloadcms/richtext-lexical"],
};

export default withPayload(nextConfig);
