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
    // ==== General rules
    {
      "description": "Wait 5 days before creating PRs for standard updates to ensure stability",
      "matchUpdateTypes": ["major", "minor", "patch"],
      "minimumReleaseAge": "5 days",
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
    },


    // ===== Internal apps
    {
      "description": "Disable pinning for internal apps",
      "matchPackagePrefixes": ["ghcr.io/portfolio-solver-platform/"],
      "matchUpdateTypes": ["pin", "digest", "pinDigest"],
      "enabled": false
    },
    {
      "description": "Internal apps: Custom versioning, separate grouping, no wait",
      "matchDatasources": ["docker"],
      "matchPackagePrefixes": ["ghcr.io/portfolio-solver-platform/"],
      "versioning": "regex:^main-[a-f0-9]{8}-(?<patch>\\d{14})$",
      "minimumReleaseAge": "0 days",
      "groupName": "Internal apps"
    }
  ],
};
