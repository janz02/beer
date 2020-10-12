/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable prettier/prettier */
const shell = require("shelljs");
const fs = require("fs-extra");
const https = require("https");

// 1. Translation key list files
const fileNameError = "src/app/i18n/backend-generated-error-codes.ts";
const fileNameEnum = "src/app/i18n/backend-generated-enum-codes.ts";
const fileNameKey = "src/app/i18n/backend-generated-key-codes.ts";

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
const generateKeys = (path, fileName, prefix = "", onData) => {
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

        if (onData) {
          onData(keys);
        }
      });

      res.on("error", error => {
        throw error;
      });
    }
  );

  req.end();
};

// Check method for notification links
const checkNotificationLinks = json => {
  const notificationLinksRaw = fs.readFileSync(
    "src/features/notification/notificationLinks.json"
  );
  const notificationLinks = JSON.parse(notificationLinksRaw);

  const allNotificationHasLink = json.every(
    x => notificationLinks.filter(z => z.type === x).length === 1
  );

  if (!allNotificationHasLink) {
    throw Error(
      "Notification links are missing for the newly added notifications. Check the feature/notification/README file"
    );
  }
};

const checkSystemParamKeys = json => {
  const systemParamsRaw = fs.readFileSync(
    "src/features/settings/systemParams/systemParams.json"
  );
  const systemParams = JSON.parse(systemParamsRaw);
  const allSystemParamHasDescription = json.every(key =>
    systemParams.find(frontendParam => frontendParam.key === key)
  );

  if (!allSystemParamHasDescription) {
    throw Error(
      "System parameter descriptions are missing for the newly added system parameter keys."
    );
  }
};

// 3. Generate lists
generateKeys("/api/Information", fileNameError);
generateKeys(
  "/api/Notifications/Types",
  fileNameEnum,
  "enum.notification-type.",
  checkNotificationLinks
);
generateKeys(
  "/api/SystemParameters/Keys",
  fileNameKey,
  "system-params.key.",
  checkSystemParamKeys
);

shell.exec("npm run i18n:generate");
