'use strict';

(function () {

  var fs = require('fs');
  var React = require('react');
  var ReactDOM = require('react-dom/server');
  var mkdirp = require('mkdirp');
  var rimraf = require('rimraf');

  var cwd = process.cwd();

  var DocsContainer = require(cwd + '/docs/src/js/components/document');

  rimraf.sync(cwd + '/docs/build/');
  mkdirp.sync(cwd + '/docs/build/js/');
  mkdirp.sync(cwd + '/docs/build/css/');

  fs.createReadStream(cwd + '/docs/src/css/styles.css')
    .pipe(fs.createWriteStream(cwd + '/docs/build/css/styles.css'));

  fs.writeFile(
    cwd + '/docs/index.html',
    '<!DOCTYPE html>' + ReactDOM.renderToStaticMarkup(
      <DocsContainer />
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
