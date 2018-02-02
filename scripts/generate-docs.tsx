// tslint:disable:no-console

import * as browserify from 'browserify';
import * as chokidar from 'chokidar';
import * as fs from 'fs';
import * as mkdirp from 'mkdirp';
import * as path from 'path';
import * as React from 'react';
import * as ReactDOM from 'react-dom/server';
import * as rimraf from 'rimraf';

const UTF8 = 'utf8';

const CWD = process.cwd();
const SHOULD_WATCH = process.argv[2] === 'watch';
const MATCHES_EXTENSION = /\.(j|t)sx?$/;

const packageJSON = JSON.parse(fs.readFileSync(path.join(CWD, 'package.json'), UTF8));

const b = browserify(
  {
    entries: [
      path.join(CWD, 'docs/src/ts/sidebar.tsx'),
      path.join(CWD, 'docs/src/ts/demo.ts'),
      path.join(CWD, 'docs/src/ts/tracking.ts'),
    ],
    paths: ['node_modules'],
    debug: true,
    cache: {},
  }
)
.plugin('tsify'); // tslint:disable-line:no-var-requires

b.plugin('minifyify', {
  map: 'build/js/bundle.map.json',
  output: path.join(CWD, '/docs/build/js/bundle.map.json'),
});

const bundle = () => {
  b.bundle(() => {
    console.log('Sidebar, analytics, and demo compiled.', new Date().toString());
  })
  .on('error', (error) => {
    console.log(error);
  })
  .pipe(fs.createWriteStream(path.join(CWD, 'docs/build/js/bundle.js')));
};

const clearModuleCache = (modulePath: string) => {
  const resolvedPath = require.resolve(modulePath);
  delete require.cache[resolvedPath];
};

const clearAllModuleCache = () => {
  const modulesToClear = [];

  for (const key in require.cache) {
    if (Object.prototype.hasOwnProperty.call(require.cache, key)) {
      const modulePath = require.cache[key].id.toString();

      if (modulePath.indexOf('node_modules') < 0 && MATCHES_EXTENSION.test(modulePath)) {
        modulesToClear.push(modulePath.replace(MATCHES_EXTENSION, ''));
      }
    }
  }

  for (const mod of modulesToClear) {
    clearModuleCache(mod);
  }
};

const copy = (src: string, dest: string) => {
  fs.createReadStream(src).pipe(fs.createWriteStream(dest));
};

const clearBuildDirectory = (verbose: boolean) => {
  rimraf.sync(CWD + '/docs/build/');
  if (verbose) {
    console.log('Build directory cleared.');
  }
};

const createBuildDirectories = (verbose: boolean) => {
  mkdirp.sync(CWD + '/docs/build/js/');
  mkdirp.sync(CWD + '/docs/build/css/');
  if (verbose) {
    console.log('Sub directories created.');
  }
};

const copyFilesToBuildDirectory = (verbose: boolean) => {
  copy(path.join(CWD, '/docs/src/css/styles.css'), path.join(CWD, '/docs/build/css/styles.css'));
  // copy(path.join(CWD, '/src/index.tsx'), path.join(CWD, '/docs/build/js/canvasimo.js'));
  // copy(path.join(CWD, '/docs/src/ts/demo.ts'), path.join(CWD, '/docs/build/js/demo.js'));
  // copy(path.join(CWD, '/docs/src/ts/tracking.ts'), path.join(CWD, '/docs/build/js/tracking.js'));
  if (verbose) {
    console.log('Static files copied.');
  }
};

const createDocumentation = () => {
  const Document = require(path.join(CWD, 'docs/src/ts/components/document')).default;

  fs.writeFile(
    path.join(CWD, 'docs/index.html'),
    '<!DOCTYPE html>' + ReactDOM.renderToStaticMarkup(
      <Document version={packageJSON.version} description={packageJSON.description} />
    ),
    (error) => {
      if (error) {
        console.error(error);
      } else {
        console.log('Docs generated.', new Date().toString());
      }
    }
  );
};

const buildEverything = (verbose: boolean) => {
  clearBuildDirectory(verbose);
  createBuildDirectories(verbose);
  copyFilesToBuildDirectory(verbose);
  createDocumentation();
  bundle();
};

if (SHOULD_WATCH) {
  const watcher = chokidar.watch('{docs/src,src}/**/*.@(j|t)s?(x)', {ignored: /(^|[\/\\])\../});

  buildEverything(true);

  watcher.on('change', (modulePath: string) => {
    console.log(`${modulePath} changed`);

    clearAllModuleCache();
    buildEverything(false);
  });
} else {
  buildEverything(true);
}
