/* eslint-disable prettier/prettier */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const shell = require("shelljs");
const fs = require("fs-extra");

// Download v1 api, and file api
// The file api needs to be downloaded separately, because the API documentation contains errors
// And can only b used when validation is skipped on it
shell
  .ShellString(
    shell.exec(
      "curl https://pkm-coupon-dev.grapetest.xyz/swagger/v1/swagger.json"
    )
  )
  .to("src/api/swagger.json");

shell
  .ShellString(
    shell.exec(
      "curl https://pkm-coupon-dev.grapetest.xyz/swagger/file/swagger.json"
    )
  )
  .to("src/api/file.json");

fs.removeSync("src/api/swagger");
fs.removeSync("src/api/file");

// Generate clients
shell.exec(
  "openapi-generator generate -i src/api/swagger.json -g typescript-fetch -p typescriptThreePlus=true -o src/api/swagger"
);
shell.exec(
  "openapi-generator generate -i src/api/file.json -g typescript-fetch -p typescriptThreePlus=true -o src/api/file --skip-validate-spec"
);
