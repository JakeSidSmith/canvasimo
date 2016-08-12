'use strict';

(function () {

  var cwd = process.cwd();

  var fs = require('fs');
  var React = require('react');
  var ReactDOM = require('react-dom/server');
  var mkdirp = require('mkdirp');
  var rimraf = require('rimraf');
  var Document = require(cwd + '/docs/src/js/components/document');

  var packageJSON = JSON.parse(fs.readFileSync(cwd + '/package.json'));

  var copy = function copy (src, dest) {
    fs.createReadStream(src).pipe(fs.createWriteStream(dest));
  }

  rimraf.sync(cwd + '/docs/build/');
  mkdirp.sync(cwd + '/docs/build/js/');
  mkdirp.sync(cwd + '/docs/build/css/');

  copy(cwd + '/docs/src/css/styles.css', cwd + '/docs/build/css/styles.css');
  copy(cwd + '/lib/index.js', cwd + '/docs/build/js/canvasimo.js');
  copy(cwd + '/docs/src/js/demo.js', cwd + '/docs/build/js/demo.js');

  fs.writeFile(
    cwd + '/docs/index.html',
    '<!DOCTYPE html>' + ReactDOM.renderToStaticMarkup(
      <Document version={packageJSON.version} />
    ),
    function (error) {
      if (error) {
        console.error(error);
      } else {
        console.log('Docs generated!');
      }
    }
  );

})();
