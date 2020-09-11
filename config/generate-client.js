/* eslint-disable prettier/prettier */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const shell = require("shelljs");
const fs = require("fs-extra");

const downloadSwaggerDefinitionFile = (url, path) => {
  shell.ShellString(shell.exec(`curl ${url}`)).to(path);
};

const generateClient = (swaggerDefFile, outputDir) => {
  shell.exec(
    `openapi-generator generate -i ${swaggerDefFile} -g typescript-fetch -p typescriptThreePlus=true -o ${outputDir}`
  );
};

const apis = [
  {
    name: "coupon-api",
    url: "https://pkm-coupon-dev.grapetest.xyz/swagger/v1/swagger.json"
  },
  {
    name: "campaign-editor-api",
    url: "https://rtd-campaigneditor-dev.grapetest.xyz/swagger/v1/swagger.json"
  }
];

// Download swagger files & Cleanup & Generate clients
apis.forEach(api => {
  const apiPath = `src/api/${api.name}`;
  const apiSwaggerFile = `src/api/${api.name}-swagger.json`;

  downloadSwaggerDefinitionFile(api.url, apiSwaggerFile);
  fs.removeSync(apiPath);
  generateClient(apiSwaggerFile, apiPath);
});
