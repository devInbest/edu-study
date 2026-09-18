/** @type {import('next').NextConfig} */
const nextConfig = {
  // Temporary: zombie next processes lock `.next` (unkillable without reboot).
  // Revert to default (remove this) after reboot frees PIDs 19216/9804/6692.
  distDir: '.next-fresh',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
      },
    ],
  },
};

export default nextConfig;
