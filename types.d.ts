/**
 * Override Node.js `global` using passed `override` object.
 * @param override - Override object
 */
declare function setGlobal(override: any): void;

/**
 * Set `navigator` global.
 */
declare function setNavigator(navigator: Navigator): void;

/**
 * Set `MutationObserver` global.
 */
declare function setMutationObserver(mutationObserver: (...params: any[]) => any): void;

/**
 * Pre-Alpine.start() setup work.
 */
declare function config(): void;

/**
 * Get x-data (Alpine) component(s) from markup
 * @param markup - markup to load
 */
declare function getComponents(markup: string): string[] | string;

/**
 * Load markup from a file asynchronously using a path.
 * @param filePath - Path to the HTML/template file to load components from
 */
declare function load(filePath: string): Promise<string[] | string>;

/**
 * Load markup from a file **synchronously** using a path.
 * @param filePath - Path to the HTML/template file to load components from
 */
declare function loadSync(filePath: string): string[] | string;

/**
 * @property $data - Alpine.js data reference
 * @property $el - Root element reference
 * @property $nextTick - Wait for a render/async operation to complete
 */
declare type AlpineElement = {
    $data: any;
    $el: Element;
    $nextTick: (...params: any[]) => any;
};

/**
 * Render Alpine.js Component Markup to JSDOM & initialise Alpine.js.
 * @param markup - Component HTML content
 * @param [data] - Override x-data for component
 */
declare function render(markup: string, data?: any | string): AlpineElement;

/**
 * Function to wait until a render/async operation complete
 */
declare function $nextTick(): Promise<void>;

/**
 * @param document - document from which Alpine components are being loaded from
 * @param alpineVersion - Alpine.js version from NPM
 */
declare function checkVersionMismatch(document: Document, alpineVersion: string): void;

