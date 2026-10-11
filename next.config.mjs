/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
  // Pas d'ESLint dans les dépendances : on évite l'étape de lint au build.
  eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;
