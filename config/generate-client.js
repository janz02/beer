// eslint-disable-next-line @typescript-eslint/no-var-requires
const shell = require("shelljs");
const fs = require("fs-extra");

// TODO: Use final DNS, lookout for prod - staging differences
shell
  .ShellString(
    shell.exec(
      "curl https://pkm-coupon-dev.grapetest.xyz/swagger/v1/swagger.json"
    )
  )
  .to("src/api/swagger.json");

fs.removeSync("src/api/swagger");

shell.exec(
  "openapi-generator generate -i src/api/swagger.json -g typescript-fetch -p typescriptThreePlus=true -o src/api/swagger"
);
