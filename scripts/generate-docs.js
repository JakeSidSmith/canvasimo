'use strict';

(function () {

  var cwd = process.cwd();
  var shouldWatch = process.argv[2] === 'watch';

  var fs = require('fs');
  var React = require('react');
  var ReactDOM = require('react-dom/server');
  var mkdirp = require('mkdirp');
  var rimraf = require('rimraf');
  var watch = require('watch');
  var browserify = require('browserify');

  var packageJSON = JSON.parse(fs.readFileSync(cwd + '/package.json'));

  var b = browserify(
    {
      entries: [cwd + '/docs/src/js/sidebar.js'],
      extensions: ['.js', '.jsx'],
      paths: ['node_modules'],
      debug: true,
      cache: {}
    }
  )
  .transform('babelify', {presets: ['react']});

  if (process.env.NODE_ENV === 'production') {
    b.plugin('minifyify', {
      map: 'build/js/sidebar.map.json',
      output: cwd + '/docs/build/js/sidebar.map.json'
    });
  }

  var bundle = function () {
    b.bundle(function () {
      console.log('Sidebar compiled.', new Date().toString());
    })
    .on('error', function (error) {
      console.log(error);
    })
    .pipe(fs.createWriteStream(cwd + '/docs/build/js/sidebar.js'));
  };

  var clearModuleCache = function (path) {
    delete require.cache[require.resolve(path)]
  };

  var clearAllModuleCache = function () {
    var modulesToClear = [];

    for (var key in require.cache) {
      var path = require.cache[key].id.toString();

      if (path.indexOf('node_modules') < 0 && path.indexOf('.js') === path.length - 3) {
        modulesToClear.push(path.replace(/\.js$/, ''));
      }
    }

    for (var i = 0; i < modulesToClear.length; i += 1) {
      clearModuleCache(modulesToClear[i]);
    }
  };

  var copy = function copy (src, dest) {
    fs.createReadStream(src).pipe(fs.createWriteStream(dest));
  }

  var clearBuildDirectory = function (verbose) {
    rimraf.sync(cwd + '/docs/build/');
    verbose && console.log('Build directory cleared.');
  };

  var createBuildDirectories = function (verbose) {
    mkdirp.sync(cwd + '/docs/build/js/');
    mkdirp.sync(cwd + '/docs/build/css/');
    verbose && console.log('Sub directories created.');
  };

  var copyFilesToBuildDirectory = function (verbose) {
    copy(cwd + '/docs/src/css/styles.css', cwd + '/docs/build/css/styles.css');
    copy(cwd + '/lib/index.js', cwd + '/docs/build/js/canvasimo.js');
    copy(cwd + '/docs/src/js/demo.js', cwd + '/docs/build/js/demo.js');
    verbose && console.log('Static files copied.');
  };

  var createDocumentation = function () {
    var Document = require(cwd + '/docs/src/js/components/document');

    fs.writeFile(
      cwd + '/docs/index.html',
      '<!DOCTYPE html>' + ReactDOM.renderToStaticMarkup(
        <Document version={packageJSON.version} />
      ),
      function (error) {
        if (error) {
          console.error(error);
        } else {
          console.log('Docs generated.', new Date().toString());
        }
      }
    );
  };

  var buildEverything = function (verbose) {
    clearBuildDirectory(verbose);
    createBuildDirectories(verbose);
    copyFilesToBuildDirectory(verbose);
    createDocumentation(verbose);
    bundle();
  };

  if (shouldWatch) {
    watch.watchTree(cwd + '/docs/src/', {ignoreDotFiles: true}, function (path) {
      if (
        typeof path === 'string' &&
        path.indexOf('node_modules') < 0 &&
        path.indexOf('.js') === path.length - 3
      ) {
        clearAllModuleCache();
      }

      buildEverything(false);
    });
  } else {
    buildEverything(true);
  }

})();
