export class App {
  #router

  /**
   * Create an app.
   * @constructor
   * @param {Router} router - The router of the app.
   */
  constructor(router) {
    this.#router = router
  }

  /**
   * Start app.
   * @param {Object} appConfig - The config of the app.
   */
  run(appConfig) {
    this.#loadEventHandlers(appConfig)
  }

  /**
   * Load global event handlers.
   * @param {Object} appConfig - The config of the app.
   */
  #loadEventHandlers(appConfig) {
    // Click
    globalThis.onclick = (event) => {
      const path = event.composedPath()[0].pathname
      if (path) {
        const host = event.composedPath()[0].hostname
        if (host && this.#isSameHost(host)) {
          event.preventDefault()
          globalThis.history.pushState({}, '', path)
          this.#router.onLinkClicked(path)
        }
      }
    }
    // Popstate
    globalThis.onpopstate = (event) => {
      const path = event.target.location.pathname
      if (path) {
        this.#router.onLinkClicked(path)
      }
    }
  }

  /**
   * Check if link has same host than app.
   * @param {string} host - The config of the app.
   * @returns {boolean}
   */
  #isSameHost(host) {
    return host === globalThis.location.hostname
  }
}
