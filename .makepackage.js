var pkg = require('./package.json');
var fs = require('fs');
var path = require('path');

delete pkg.scripts;

var cjsPkg = Object.assign({}, pkg, {
    name: 'rxemitter',
    main: 'index.js',
    typings: 'index.d.ts'
});

fs.writeFileSync('dist/cjs/package.json', JSON.stringify(cjsPkg, null, 2));
fs.writeFileSync('dist/cjs/README.md', fs.readFileSync('./README.md').toString());