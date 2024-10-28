// @ts-check

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  productionBrowserSourceMaps: true,
  transpilePackages: ["next-mdx-remote"],
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname:
          "redistribute-community-pictures.nyc3.cdn.digitaloceanspaces.com",
      },
    ],
  },
};

export default nextConfig;
