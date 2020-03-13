/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable prettier/prettier */
const shell = require("shelljs");
const fs = require("fs-extra");
const https = require("https");

// 1. Get translation key list.
const req = https.request(
  {
    // TODO: Use final DNS, lookout for prod - staging differences
    hostname: "pkm-coupon-dev.grapetest.xyz",
    path: "/api/Information",
    method: "GET"
  },
  res => {
    res.on("data", d => {
      const keys = JSON.parse(d);

      // 2. Remove old list stored in backend-codes.ts.
      const fileName = "src/app/i18n/backend-codes.ts";
      fs.removeSync(fileName);

      // 3. Generate new backend-codes.ts with the new list.
      fs.createFileSync(fileName);
      let content = "import i18n from '.'";
      content += keys.reduce((acc, key) => acc + `\ni18n.t('${key}')`, "");
      content += "\n";
      fs.appendFileSync(fileName, content);

      // 4. Generate i18n files with scanner.
      shell.exec("npm run i18n:generate");
    });

    res.on("error", error => {
      throw error;
    });
  }
);

req.end();
