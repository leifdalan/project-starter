//  enable runtime transpilation to use ES6/7 in node
global.__CLIENT__ = false;
const packageJson = require('./package.json');
const addedBabel = packageJson.babel;
addedBabel.presets.push('es2015');
require('babel-register')(addedBabel);

require('./server');
