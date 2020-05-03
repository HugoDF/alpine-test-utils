// @ts-check
const fs = require('fs');
const {promisify} = require('util');
const readFile = promisify(fs.readFile);
const {JSDOM} = require('jsdom');
const {config, setGlobal, setMutationObserver} = require('./config');

// Needs to happen before loading Alpine
config();

const Alpine = require('alpinejs');

/**
 *
 * @param {string} filePath - Path to the HTML/template file to load components from
 * @returns {Promise<Array<string>|string>}
 */
async function load(filePath) {
  const file = await readFile(filePath, 'utf-8');
  const {document} = new JSDOM(file).window;
  const components = [...document.querySelectorAll('[x-data]')].map(
    (element) => element.outerHTML
  );
  return components.length === 1 ? components[0] : components;
}

/**
 *
 * @param {string} markup - Component HTML content
 * @param {object|string} [data] - Override x-data for component
 * @returns {Element}
 */
function render(markup, data) {
  if (typeof markup !== 'string') {
    throw new Error('alpine-test-utils render(): "markup" should be a string');
  }
  // Create new document from html
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
 * Function to wait until a render/async operation happens
 * @returns {Promise<void>}
 */
async function $nextTick() {
  // eslint-disable-next-line no-unused-vars
  await new Promise((resolve, reject) => setTimeout(resolve, 0));
}

module.exports = {
  setMutationObserver,
  // Don't really want to, but it's a good
  // constrained escape
  setGlobal,
  load,
  render
};
