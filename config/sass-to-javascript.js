const fs = require('fs');
const path = require('path');

/**
 * Convert SASS file to object
 * @param filePath path to the file
 * @return object javascript object
 */
exports.default = (filePath) => {
  const file = fs.readFileSync(path.resolve(__dirname, filePath));
  const dataString = file.toString();
  const lines = dataString.split('\n');
  return lines
    .filter(Boolean)
    .map((line) => line.match(/\$(.*): (.*);/))
    .reduce((acc, line) => {
      const objectProperty = `@${line[1]}`;
      const objectValue = `${line[2]}`;
      return {
        ...acc,
        [objectProperty]: objectValue,
      };
    }, {});
};
