import type { NextConfig } from "next";

const nextConfig: NextConfig = {
 webpack: (config, { isServer, webpack }) => {
    if (!isServer) {
      config.resolve.fallback.fs = false;
    }

    return config;
  },
};

export default nextConfig;
