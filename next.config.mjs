/** @type {import('next').NextConfig} */

const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    // loader: "imgix",
    // path: "",
  },
};

// We'll handle i18n configuration here if needed
// const i18n = {
//   // Add your i18n configuration here
// };

// export { i18n };
export default nextConfig;

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   webpack(config) {
//     config.module.rules.push({
//       test: /\.svg$/i,
//       issuer: /\.[jt]sx?$/,
//       use: ["@svgr/webpack"],
//     });

//     return config;
//   },
// };

// export default nextConfig;
