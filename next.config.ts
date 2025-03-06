import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    // GLBファイルをアセットとして処理
    config.module.rules.push({
      test: /\.(glb|gltf)$/,
      type: 'asset/resource',
    });
    
    // PNGなどの画像ファイルも必要に応じて設定
    config.module.rules.push({
      test: /\.(png|jpg|jpeg|gif)$/i,
      type: 'asset/resource',
    });
    
    return config;
  },
};

export default nextConfig;