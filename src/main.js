// @ts-check
const fs = require('fs');
const {promisify} = require('util');
const readFile = promisify(fs.readFile);
const {JSDOM} = require('jsdom');
const {config, setGlobal, setMutationObserver} = require('./config');
const {checkVersionMismatch} = require('./version-mismatch');

// Needs to happen before loading Alpine
config();

let Alpine;
try {
  Alpine = require('alpinejs');
} catch {
  throw new Error(
    "Alpine.js npm module ('alpinejs') not found - try installing it with `npm install --save-dev alpinejs`"
  );
}

// Not great, but makes sure we know the version of Alpine.js loaded from NPM.
// Safe to do here because if Alpine.js wasn't in node_modules
// we would have already thrown (see above).
const {version: AlpineVersion} = require('alpinejs/package.json');

/**
 * Get x-data (Alpine) component(s) from markup
 * @param {string} markup - markup to load
 * @returns {Array<string>|string}
 */
const getComponents = (markup) => {
  const {document} = new JSDOM(markup).window;

  checkVersionMismatch(document, AlpineVersion);

  const components = [...document.querySelectorAll('[x-data]')].map(
    (element) => element.outerHTML
  );
  return components.length === 1 ? components[0] : components;
};

/**
 * Load markup from a file asynchronously using a path.
 *
 * @param {string} filePath - Path to the HTML/template file to load components from
 * @returns {Promise<Array<string>|string>}
 */
async function load(filePath) {
  const markup = await readFile(filePath, 'utf-8');
  return getComponents(markup);
}

/**
 * Load markup from a file **synchronously** using a path.
 *
 * @param {string} filePath - Path to the HTML/template file to load components from
 * @returns {Array<string>|string}
 */
function loadSync(filePath) {
  console.warn(
    'alpine-test-utils: loadSync() can cause performance issues, prefer async "load()"'
  );
  const markup = fs.readFileSync(filePath, 'utf-8');
  return getComponents(markup);
}

/**
 * @typedef AlpineProps
 * @type {object}
 * @property {object} $data - Alpine.js data reference
 * @property {Element} $el - Root element reference
 * @property {Function} $nextTick - Wait for a render/async operation to complete
 *
 * @typedef {Element|AlpineProps} AlpineElement
 */

/**
 * Render Alpine.js Component Markup to JSDOM & initialise Alpine.js.
 *
 * @param {string} markup - Component HTML content
 * @param {object|string} [data] - Override x-data for component
 * @returns {AlpineElement}
 */
function render(markup, data) {
  if (typeof markup !== 'string') {
    throw new TypeError(
      'alpine-test-utils render(): "markup" should be a string'
    );
  }

  // Create new window/document from html
  const {window} = new JSDOM(markup);
  const {document: _document} = window;

  const isJestWithJSDOM =
    // @ts-ignore
    typeof jest !== 'undefined' && typeof document !== 'undefined';

  // Alpine.start looks at `document`
  // set and unset current document before/after respectively
  setGlobal({
    window,
    document: _document
  });

  let component = _document.querySelector('[x-data]');
  if (data) {
    component.setAttribute(
      'x-data',
      typeof data === 'string' ? data : JSON.stringify(data)
    );
  }

  if (isJestWithJSDOM) {
    document.body.innerHTML = component.outerHTML;
    component = document.body;
  }

  Alpine.start();

  // @ts-ignore
  return Object.assign(component, component.__x, {$nextTick});
}

/**
 * Function to wait until a render/async operation complete
 * @returns {Promise<void>}
 */
async function $nextTick() {
  // eslint-disable-next-line no-unused-vars
  await new Promise((resolve, reject) => {
    setTimeout(resolve, 0);
  });
}

module.exports = {
  setMutationObserver,
  // I don't like exporting this, but it's a good escape hatch
  setGlobal,
  load,
  loadSync,
  render
};
