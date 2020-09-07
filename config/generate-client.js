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

const couponApiPath = "src/api/coupon-api";
const campaignEditorApiPath = "src/api/campaign-editor-api";
const couponApiSwaggerFile = "src/api/coupon-api-swagger.json";
const campaignEditorSwaggerFile = "src/api/campaign-editor-api-swagger.json";

// Download swagger files
downloadSwaggerDefinitionFile(
  "https://pkm-coupon-dev.grapetest.xyz/swagger/v1/swagger.json",
  couponApiSwaggerFile
);
downloadSwaggerDefinitionFile(
  "https://rtd-campaigneditor-dev.grapetest.xyz/swagger/v1/swagger.json",
  campaignEditorSwaggerFile
);

// Cleanup
fs.removeSync(couponApiPath);
fs.removeSync(campaignEditorApiPath);

// Generate clients
generateClient(couponApiSwaggerFile, couponApiPath);
generateClient(campaignEditorSwaggerFile, campaignEditorApiPath);
