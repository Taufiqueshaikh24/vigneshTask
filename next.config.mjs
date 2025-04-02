// /** @type {import('next').NextConfig} */
// const nextConfig = {};

// export default nextConfig;



/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/:shortcode",  // When user visits /abc123
        destination: "/api/v1/:shortcode", // Call API route
      },
    ];
  },
};

export default nextConfig;
