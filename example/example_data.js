// example_data.js
module.exports = {
  app: {
    name: "DeepSearch Viewer",
    version: "1.2.3",
    config: {
      theme: "dark-mode",
      features: {
        search: true,
        export: false,
        autocomplete: true,
      }
    },
    logs: [
      { message: "User login success", level: "info" },
      { message: "Search executed", level: "debug" },
      { message: "Export failed", level: "error" }
    ],
    user: {
      name: "Alice",
      email: "alice@example.com",
      preferences: {
        notifications: true,
        language: "English",
        timezone: "UTC+1"
      }
    }
  }
};
