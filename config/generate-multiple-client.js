/* eslint-disable prettier/prettier */

// ------ Config
const services = [
  {
    name: "coupon",
    url: "https://pkm-coupon-dev.grapetest.xyz/swagger/v1/swagger.json"
  },
  {
    name: "files",
    url: "https://pkm-files-dev.grapetest.xyz/swagger/v1/swagger.json"
  }
];

const docsFolder = "src/api2/docs";
const generatedApisFolder = "src/api2/swagger";

// ------ Scripts
// eslint-disable-next-line @typescript-eslint/no-var-requires
const shell = require("shelljs");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require("fs-extra");
const docFolder = ms => `${docsFolder}/${ms}.json`;
const generatedApiFolder = ms => `${generatedApisFolder}/${ms}`;
const downloadDocumentation = async ({ name, url }) => {
  await shell
    .ShellString(shell.exec(`curl ${url}`))
    .to(`${docsFolder}/${name}.json`);
};
const generateFetchApi = async ({ name }) => {
  await shell.exec(
    `openapi-generator generate -i ${docFolder(name)} -o ${generatedApiFolder(
      name
    )} -g typescript-fetch -p typescriptThreePlus=true`
  );
};

const run = async () => {
  console.log("\n\n\n\n Downloading Docs ");
  fs.removeSync(docsFolder);
  fs.ensureDirSync(docsFolder);

  for (let i = 0; i < services.length; i++) {
    const ms = services[i];
    console.log("\x1b[33m%s\x1b[0m", "\n   ->  Doc: " + ms.name);
    await downloadDocumentation(ms);
    console.log("\n\n\n\n");
  }

  fs.removeSync(generatedApisFolder);
  fs.ensureDirSync(generatedApisFolder);

  for (let i = 0; i < services.length; i++) {
    const ms = services[i];
    console.log(
      "\x1b[33m%s\x1b[0m",
      "\n\n\n\n Generating API from downloaded docs"
    );
    console.log(
      "\x1b[33m%s\x1b[0m",
      "\n   ->  Gen: " + ms.name + " (" + (i + 1) + "/" + services.length + ")"
    );
    await generateFetchApi(ms);
  }

  console.log("\n\n\n\n");
  console.log("\x1b[36m%s\x1b[0m", "Generated microservice clients: ");

  for (let i = 0; i < services.length; i++) {
    const ms = services[i].name;
    const docOk = fs.pathExistsSync(docFolder(ms));
    const apiOk = fs.pathExistsSync(generatedApiFolder(ms));
    let status = "FAIL";
    if (docOk && apiOk) {
      status = "OK";
    }
    const msgStatus =
      `${status.padStart(6)}   ->   ` + services[i].name.padEnd(12);
    const msgUrl = "\t" + services[i].url;
    if (status === "FAIL") {
      console.log("\x1b[41m%s\x1b[0m", msgStatus, msgUrl);
    } else {
      console.log("\x1b[36m%s\x1b[0m", msgStatus, msgUrl);
    }
  }
  console.log("\n");
};

run();
