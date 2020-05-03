// @ts-check
const fs = require('fs');
const {promisify} = require('util');
const readFile = promisify(fs.readFile);
const {JSDOM} = require('jsdom');
const {config, setGlobal, setMutationObserver} = require('./config');

// Needs to happen before loading Alpine
config();

const Alpine = require('alpinejs');

const getComponents = (markup) => {
  const {document} = new JSDOM(markup).window;
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
  const {document} = window;

  // Alpine.start looks at `document`
  // set and unset current document before/after respectively
  setGlobal({
    window,
    document
  });

  const component = document.querySelector('[x-data]');
  if (data) {
    component.setAttribute(
      'x-data',
      typeof data === 'string' ? data : JSON.stringify(data)
    );
  }

  Alpine.start();
  // @ts-ignore
  Object.assign(component, component.__x, {$nextTick});
  return component;
}

/**
 * Function to wait until a render/async operation complete
 * @returns {Promise<void>}
 */
async function $nextTick() {
  // eslint-disable-next-line no-unused-vars
  await new Promise((resolve, reject) => setTimeout(resolve, 0));
}

module.exports = {
  setMutationObserver,
  // I don't like exporting this, but it's a good escape hatch
  setGlobal,
  load,
  loadSync,
  render
};
