import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Sidebar from './components/sidebar';
import { Docs } from './types';

// tslint:disable-next-line:no-var-requires
const docs: Docs = require('../../build/json/docs.json');

ReactDOM.render(<Sidebar javascript docs={docs} />, document.getElementById('sidebar'));
