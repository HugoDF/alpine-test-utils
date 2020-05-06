/**
 *
 * @param {Document} document - document from which Alpine components are being loaded from
 * @param {string} alpineVersion - Alpine.js version from NPM
 * @returns {void}
 */
function checkVersionMismatch(document, alpineVersion) {
  if (document.scripts.length === 0) return;
  const alpineScript = [...document.scripts].find(
    (s) => s.src.includes('dist/alpine') || s.src.includes('alpinejs/alpine')
  );
  if (!alpineScript) return;
  // Match v1.x.x, v2.x.x etc (the bit between @ and /)from
  // `https://cdn.jsdelivr.net/gh/alpinejs/alpine@v2.x.x/dist/alpine.min.js`
  const [jsDelivrVersion] = alpineScript.src.match(/(?<=@v)[a-z|\d.]*(?=\/)/gm);
  const cdnMajorVersion = jsDelivrVersion[0];
  if (!alpineVersion.startsWith(cdnMajorVersion)) {
    console.warn(
      `alpine-test-utils: Alpine.js version is different to CDN one, requested "${jsDelivrVersion}", testing with "${alpineVersion}"`
    );
  }
}

module.exports = {checkVersionMismatch};
