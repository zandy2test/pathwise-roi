/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable experimental features for performance
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['framer-motion', 'lucide-react'],
  },
  
  // Compression and optimization
  compress: true,
  
  // Image optimization settings
  images: {
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Headers for better caching
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          }
        ],
      },
      // Static assets caching
      {
        source: '/api/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=300, s-maxage=300' // 5 minutes for API routes
          }
        ]
      },
      // Blog posts caching
      {
        source: '/blog/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, s-maxage=3600' // 1 hour for blog posts
          }
        ]
      }
    ];
  },

  // Bundle analyzer for optimization (commented out for production)
  // webpack: (config, { isServer }) => {
  //   if (!isServer) {
  //     config.resolve.fallback = {
  //       ...config.resolve.fallback,
  //       fs: false,
  //     };
  //   }
  //   return config;
  // },

  // Performance optimizations
  poweredByHeader: false,
  
  // Output settings
  output: 'standalone',
  
  // TypeScript and ESLint settings for faster builds
  typescript: {
    // Only run type checking in development
    ignoreBuildErrors: process.env.NODE_ENV === 'production',
  },
  eslint: {
    // Only run ESLint in development
    ignoreDuringBuilds: process.env.NODE_ENV === 'production',
  },
  
  // Redirect for SEO
  async redirects() {
    return [
      {
        source: '/calculate-roi',
        destination: '/calculate',
        permanent: true,
      },
      {
        source: '/roi-calculator',
        destination: '/calculate',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig