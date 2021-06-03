// config-overrides.js
const { alias } = require("react-app-rewire-alias");

module.exports = function override(config) {
  const result = alias({
    "@interfaces": "src/interfaces",
    "@redux": "src/redux",
    "@defaults": "src/defaults",
    "@media": "src/media",
    "@svg": "src/svg",
    "@scss": "src/scss",
    "@type": "src/types",
    "@utils": "src/utils",
    "@regexp": "src/regexp",
    "@schema": "src/schema",
    "@routes": "src/routes",
    "@pages": "src/pages",
    "@providers": "src/providers",
    "@app": "src/app",
    "@components": "src/components",
    "@contexts": "src/contexts",
    "@root": "src/.",
  })(config);
  return result;
};
