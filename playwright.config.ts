import { defineConfig, devices } from "@playwright/test";

// Tests run against the STATIC EXPORT (`npm run build` first) — exactly what Google and users get.
export default defineConfig({
  testDir: "tests/e2e",
  fullyParallel: true,
  reporter: [["list"]],
  use: { baseURL: "http://localhost:4173", trace: "off" },
  webServer: { command: "python3 -m http.server 4173 -d out", url: "http://localhost:4173", reuseExistingServer: false },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"], viewport: { width: 1366, height: 900 } } },
    { name: "mobile", use: { ...devices["Pixel 7"] } },
  ],
});
