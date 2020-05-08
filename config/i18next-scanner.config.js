module.exports = {
  input: [
    "src/**/*.{ts,tsx}",
    "!src/**/*.test.{ts,tsx}",
    "!**/node_modules/**"
  ],
  output: "./",
  options: {
    debug: process.env.NODE_ENV === "development",
    func: {
      list: ["t"],
      extensions: [".ts", ".tsx"]
    },
    sort: true,
    removeUnusedKeys: true,
    lngs: ["en", "hu"],
    defaultLng: "en",
    defaultNs: "translation",
    defaultValue: "__STRING_NOT_TRANSLATED__",
    resource: {
      loadPath: "src/app/i18n/locales/{{lng}}.json",
      savePath: "src/app/i18n/locales/{{lng}}.json",
      jsonIndent: 2,
      lineEnding: "\n"
    },
    interpolation: {
      prefix: "{{",
      suffix: "}}"
    }
  }
};
