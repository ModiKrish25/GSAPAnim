import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {},
  allowedDevOrigins: ['192.168.29.90', '192.168.29.90:3000'],
  webpack: (config, { dev, isServer, webpack }) => {
    if (dev && !isServer) {
      config.plugins.push(
        new webpack.DefinePlugin({
          'process.env.__NEXT_HMR_URL': JSON.stringify('ws://192.168.29.90:3000/_next/webpack-hmr')
        })
      );
    }
    return config;
  }
};

export default nextConfig;
