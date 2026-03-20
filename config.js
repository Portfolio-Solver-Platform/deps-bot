module.exports = {
  // Bot settings
  platform: "github",
  autodiscover: true,
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
