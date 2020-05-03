// @ts-check
const {JSDOM} = require('jsdom');

/**
 * Override Node.js `global` using passed `override` object.
 *
 * @param {object} override - Override object
 * @returns {void}
 */
function setGlobal(override) {
  Object.assign(global, override);
}

/**
 * Set `navigator` global.
 *
 * @param {Navigator} navigator
 * @returns {void}
 */
function setNavigator(navigator) {
  setGlobal({
    navigator
  });
}

/**
 * Set `MutationObserver` global.
 *
 * @param {Function} mutationObserver
 * @returns {void}
 */
function setMutationObserver(mutationObserver) {
  setGlobal({
    MutationObserver: mutationObserver
  });
}

/**
 * Pre-Alpine.start() setup work.
 *
 * @returns {void}
 */
function config() {
  // These need to happen before Alpine.js loads
  // otherwise it tries to start() itself,
  // since "isTesting" returns false.
  setNavigator(new JSDOM().window.navigator);
  setMutationObserver(
    class {
      observe() {}
    }
  );
}

module.exports = {
  setGlobal,
  setNavigator,
  setMutationObserver,
  config
};
