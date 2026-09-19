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
      {
        protocol: 'https',
        hostname: 'flagcdn.com',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/courses/mbbs-md-ms',
        destination: '/courses/mbbs',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
