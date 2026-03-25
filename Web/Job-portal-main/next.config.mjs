/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ['lh3.googleusercontent.com', 'images.unsplash.com', 'via.placeholder.com', 'img.clerk.com'],
    },
    experimental: {
      serverComponentsExternalPackages: ['@prisma/client', 'prisma'],
    },
  }

  export default nextConfig