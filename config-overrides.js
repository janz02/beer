const { override, fixBabelImports, addLessLoader } = require('customize-cra');
const convert = require('./scripts/sass-to-javascript.js').default;
const modifyVars = convert('../src/assets/scss/_ant-variables.scss');

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars,
  }),
);
