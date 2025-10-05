import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.nasa.gov",
      },
      {
        protocol: "https",
        hostname: "api.mapbiomas.org",
      },
    ],
  },
  outputFileTracingRoot: "/home/vivi/projetos/hackathons/vchain/frontend/veriesg-dapp",
};

export default nextConfig;