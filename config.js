module.exports = {
  // Bot settings
  platform: "github",
  autodiscover: false,
  onboarding: false,
  requireConfig: "optional",
  prHourlyLimit: 10,
  prConcurrentLimit: 20,

  // Dependency settings
  extends: [
    "config:best-practices"
  ],
  timezone: "Europe/Copenhagen",
  labels: ["deps-bot"],

  packageRules: [
    // ===== Custom image tags
    // {
    //   "description": "Parse custom timestamp Docker tags for internal apps",
    //   "matchDatasources": ["docker"],
    //   "matchPackageNames": ["/^ghcr\\.io/portfolio-solver-platform//"],
    //   "versioning": "regex:^main-[a-f0-9]{8}-(?<patch>\\d{14})$"
    // },
    // {
    //   "description": "Prevent built-in managers from fighting our custom regex manager",
    //   "matchManagers": ["helm-values", "flux"],
    //   "matchPackageNames": ["/^ghcr\\.io/portfolio-solver-platform//"],
    //   "enabled": false
    // },
    //
    // // ===== Other rules
    // {
    //   "description": "Wait 5 days before creating PRs for standard updates to ensure stability",
    //   "matchUpdateTypes": ["major", "minor", "patch"],
    //   "minimumReleaseAge": "5 days",
    //   // Exclude internal apps from the 5-day wait so CI/CD is instant
    //   "matchPackageNames": ["!/^ghcr\\.io/portfolio-solver-platform//"]
    // },
    {
      "description": "Wait 5 days before creating PRs for standard updates to ensure stability",
      "matchUpdateTypes": ["major", "minor", "patch"],
      "minimumReleaseAge": "5 days",
      "excludePackagePrefixes": ["ghcr.io/portfolio-solver-platform/"]
    },
    {
      "description": "NUCLEAR: Completely disable pinning for internal apps",
      "matchPackagePrefixes": ["ghcr.io/portfolio-solver-platform/"],
      "matchUpdateTypes": ["pin", "digest", "pinDigest"],
      "enabled": false
    },
    {
      "description": "Internal apps: Custom versioning and separate grouping",
      "matchDatasources": ["docker"],
      "matchPackagePrefixes": ["ghcr.io/portfolio-solver-platform/"],
      "versioning": "regex:^main-[a-f0-9]{8}-(?<patch>\\d{14})$",
      "groupName": "Internal apps" // Separates them from postgres to stop branch collisions
    },
    {
      "description": "Group all minor and patch Rust crate updates together",
      "matchManagers": ["cargo"],
      "matchUpdateTypes": ["minor", "patch"],
      "groupName": "Rust minor and patch updates"
    },
    {
      "description": "Group all minor and patch Python dependencies together",
      "matchDatasources": ["pypi"],
      "matchUpdateTypes": ["minor", "patch"],
      "groupName": "Python minor and patch updates"
    },
    {
      "description": "Group all GitHub Actions updates together",
      "matchManagers": ["github-actions"],
      "groupName": "GitHub Actions updates"
    },
    {
      "description": "Group all Docker image updates together",
      "matchDatasources": ["docker"],
      "groupName": "Docker image updates"
    }
  ],
};
