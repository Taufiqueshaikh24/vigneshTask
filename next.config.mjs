// /** @type {import('next').NextConfig} */
// const nextConfig = {};

// export default nextConfig;




// /** @type {import('next').NextConfig} */
// const nextConfig = {
//     experimental: {
//       serverActions: {
//         bodySizeLimit: "50mb", // Increase the body size limit
//       },
//     },
//   };
  
//   export default nextConfig;
  


/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["source.unsplash.com"], // ✅ Use domains instead of remotePatterns
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "50mb", // Increase the body size limit
    },
  },
  eslint: {
    ignoreDuringBuilds: true, // Disables eslint during the build (optional)
  },
  productionBrowserSourceMaps: true, // Enables source maps in production for debugging (optional)
  webpack: (config, { dev }) => {
    if (dev) {
      // Modify Webpack settings in development mode if necessary
    }
    return config;
  },
  
  // Add any other custom settings or plugins here
};

export default nextConfig;
