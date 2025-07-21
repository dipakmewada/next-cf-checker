import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;

// added by create cloudflare to enable calling `getCloudflareContext()` in `next dev`
import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare';

// Only initialize during dev, not during build to prevent EPIPE errors
// Also skip in Docker containers to prevent EPIPE issues
if (process.env.NODE_ENV !== 'production' && 
    process.env.npm_lifecycle_event !== 'build' &&
    !process.env.DOCKER_CONTAINER &&
    !process.env.container) {
  initOpenNextCloudflareForDev();
}
