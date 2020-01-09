const shell = require('shelljs')

// TODO: Use final DNS, lookout for prod - staging differences
shell.ShellString(shell.exec("curl https://localhost:44334/swagger/v1/swagger.json")).to("src/api/swagger.json")

shell.exec("openapi-generator generate -i src/api/swagger.json -g typescript-fetch -p typescriptThreePlus=true -o src/api/swagger")