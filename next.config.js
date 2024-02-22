/** @type {import('next').NextConfig} */
const nextConfig = {
  logging:{
    fetches: {
      fullUrl: true
    }
  },
  experimental: {
    ppr: false,
  },
}
 
module.exports = nextConfig