module.exports = {
  env: {
    es6: true,
    node: true,
  },

  parserOptions: {
    "ecmaVersion": 2022,
  },

  extends: [
    "eslint:recommended",
    "google",
  ],

  rules: {
    "no-restricted-globals": [
      "error",
      "name",
      "length",
    ],

    "prefer-arrow-callback": "error",

    "quotes": [
      "error",
      "double",
      {
        "allowTemplateLiterals": true,
      },
    ],

    /*
     * Allow Windows CRLF line endings.
     */
    "linebreak-style": "off",

    /*
     * CWS Academy Firebase Functions use descriptive
     * section comments rather than JSDoc for every
     * helper function.
     */
    "require-jsdoc": "off",
  },

  overrides: [
    {
      files: [
        "**/*.spec.*",
      ],

      env: {
        mocha: true,
      },

      rules: {},
    },
  ],

  globals: {},
};
