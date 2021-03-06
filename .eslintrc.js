module.exports = {
  extends: [
    "react-app",
    "airbnb/base",
    "prettier",
  ],
  "plugins": [
    "prettier",
  ],
  rules: {
    "quotes": ["warn", "single"],
    "no-param-reassign": "off",
    "no-underscore-dangle": "off",
    "camelcase": "off",
    "no-console": "off",
    "no-plusplus": "off",
    "no-shadow": "off",
    "import/order": ["error", {
      "groups": ["builtin", "external", "parent", "sibling", "index"],
      "newlines-between": "never",
    }],
    // "no-restricted-imports": ["error", {
    //   "paths": ["@material-ui/core"],
    // }],
    "no-restricted-imports": ["error", {
      "paths": ["@material-ui/icons"],
    }],
    "no-restricted-imports": ["error", {
      "paths": ["@material-ui"],
      "patterns": ["@material-ui/core/**/*", "!@material-ui/core/styles" ]
    }]
  },
  overrides: [
    {
      "files": [
        "**/*.ts?(x)"
      ],
      "rules": {
        "additional-typescript-only-rule": "warn"
      }
    }
  ],
  settings: {
    "import/resolver": {
      "node": {
        "extensions": [".js",".jsx",".ts",".tsx",".json",]
      }
    }
  }
}
