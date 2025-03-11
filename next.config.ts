/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone", // Ensures static output (next export)
  trailingSlash: true, // Important for CloudFront to serve correct paths
  images: {
    unoptimized: true, // Required for next export when using images
  },
  reactStrictMode: true,
  experimental: {
    appDir: true, // Ensure App Router works properly
  },
};

module.exports = nextConfig;
