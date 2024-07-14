import { defineConfig, mergeConfig } from 'vitest/config'
import viteConfig from "./vite.config"

export default mergeConfig(viteConfig, defineConfig({
  test: {
    include: ["src/**/__tests__/**/*.e2e.{ts,tsx}"],
    hookTimeout: 30000,
    environment: 'jsdom'
  }
}))