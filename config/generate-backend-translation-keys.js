/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable prettier/prettier */
const shell = require("shelljs");
const fs = require("fs-extra");
const https = require("https");

// 1. Translation key list files
const fileNameError = "src/app/i18n/backend-generated-error-codes.ts";
const fileNameEnum = "src/app/i18n/backend-generated-enum-codes.ts";

// 2. Remove old list file and prepare the new one
(() => {
  const fileNames = [fileNameError, fileNameEnum];
  fileNames.forEach(fileName => {
    fs.removeSync(fileName);
    fs.createFileSync(fileName);
    fs.appendFileSync(fileName, "import i18n from '.'");
  });
})();

// Function to generate translation keys
const generateKeys = (path, fileName, prefix = "") => {
  const req = https.request(
    {
      hostname: "pkm-coupon-dev.grapetest.xyz",
      path,
      method: "GET"
    },
    res => {
      res.on("data", d => {
        const keys = JSON.parse(d);
        let content = "";
        content += keys.reduce(
          (acc, key) => acc + `\ni18n.t('${prefix}${key}')`,
          ""
        );
        content += "\n";
        fs.appendFileSync(fileName, content);
      });

      res.on("error", error => {
        throw error;
      });
    }
  );

  req.end();
};

// 3. Genatat lists
generateKeys("/api/Information", fileNameError);
generateKeys(
  "/api/Notifications/Types",
  fileNameEnum,
  "enum.noitfication-type."
);

shell.exec("npm run i18n:generate");
