'use strict';

(function () {

  var fs = require('fs');
  var React = require('react');
  var ReactDOM = require('react-dom/server');
  var mkdirp = require('mkdirp');
  var rimraf = require('rimraf');

  var cwd = process.cwd();

  var DocsContainer = require(cwd + '/docs/src/js/components/docs-container');

  rimraf.sync(cwd + '/docs/build/js/');
  mkdirp.sync(cwd + '/docs/build/js/');

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
