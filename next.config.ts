import type { NextConfig } from "next";
import {resolve} from 'node:path';

const nextConfig: NextConfig = {
  /* config options here */
  turbopack: {
    root: resolve('../')
  }
};

export default nextConfig;
