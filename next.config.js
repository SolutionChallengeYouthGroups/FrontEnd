const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");

// makes out app a PWA:
module.exports = withPWA({
  pwa: {
    disable: process.env.NODE_ENV === "development",
    dest: "public",
    runtimeCaching,
  },
});
