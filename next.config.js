const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");

console.log("ENV:" + process.env.NODE_ENV);
module.exports = withPWA({
  pwa: {
    disable: process.env.NODE_ENV === "development",
    dest: "public",
    runtimeCaching,
  },
});
