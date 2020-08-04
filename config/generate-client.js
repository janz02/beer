/* eslint-disable prettier/prettier */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const shell = require("shelljs");
const fs = require("fs-extra");

shell
  .ShellString(
    shell.exec(
      "curl http://localhost:52136/swagger/v1/swagger.json"
    )
  )
  .to("src/api/swagger.json");

fs.removeSync("src/api/swagger");

// Generate clients
shell.exec(
  "openapi-generator generate -i src/api/swagger.json -g typescript-fetch -p typescriptThreePlus=true -o src/api/swagger"
);
