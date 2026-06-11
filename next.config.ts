import type { NextConfig } from "next";
import os from "os";

function getLocalIp() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    const iface = interfaces[name];
    if (iface) {
      for (const net of iface) {
        // Support Node 18+ where family is a string or number
        const isIpv4 = net.family === "IPv4" || (net.family as any) === 4;
        if (isIpv4 && !net.internal) {
          return net.address;
        }
      }
    }
  }
  return "127.0.0.1";
}

const localIp = getLocalIp();

const nextConfig: NextConfig = {
  turbopack: {},
  allowedDevOrigins: [localIp, `${localIp}:3000`, 'localhost', 'localhost:3000'],
  webpack: (config, { dev, isServer, webpack }) => {
    if (dev && !isServer) {
      config.plugins.push(
        new webpack.DefinePlugin({
          'process.env.__NEXT_HMR_URL': JSON.stringify(`ws://${localIp}:3000/_next/webpack-hmr`)
        })
      );
    }
    return config;
  }
};

export default nextConfig;

