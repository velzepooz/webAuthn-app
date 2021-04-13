module.exports = {
  extends: '@mate-academy/eslint-config-react',
  rules: {
    'arrow-body-style': 0,
    "space-before-function-paren": ["error", {
      "anonymous": "always",
      "named": "never",
      "asyncArrow": "always"
    }],
  },
};
