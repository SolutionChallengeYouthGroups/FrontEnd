const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");
// const runtimeCaching = require("./PWACaching.js");

// makes out app a PWA:
module.exports = withPWA({
  pwa: {
    // disable: process.env.NODE_ENV === "development",
    dest: "public",
    runtimeCaching,
  },
});
