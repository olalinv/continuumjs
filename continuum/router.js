import { appConfig } from '../config/app.config.js'
import { Constant } from './constant.js'
import { Regex } from './regex.js'

export class Router {
  #layout
  #routes

  /**
   * Create a router.
   * @constructor
   * @param {Object} routerConfig - The config of the router.
   */
  constructor(routerConfig) {
    this.layout = routerConfig.layout
    this.pages = routerConfig.pages
    this.routes = routerConfig.routes
    this.#browseTo(globalThis.location.pathname)
  }

  /**
   * Browse to a route.
   * @param {string} path - The current path.
   */
  #browseTo(path) {
    path = Regex.removeFirstSlash(path)
    const routeToLoad = this.routes.find((route) => route.path === path)
    if (routeToLoad) {
      this.#loadComponent(routeToLoad)
    } else {
      let isSamePath = true
      for (let index = 0; index < this.routes.length; index++) {
        const route = this.routes[index]
        isSamePath = this.#isSamePath(route.path, path)
        if (isSamePath) {
          const params = this.#getPathParams(route.path, path)
          this.#loadComponent(route, params)
          break
        }
      }
      if (!isSamePath) {
        const routeToLoad = this.routes.find(
          (route) => route.type === Constant.ERROR_404
        )
        if (routeToLoad) {
          this.#loadComponent(routeToLoad)
        }
      }
    }
  }

  /**
   * Load a component.
   * @param {Object} route - The route of the component.
   * @param {string[]} params - The params of the component.
   */
  #loadComponent(route, params = []) {
    const Layout = route.layout ?? this.layout
    const Component = route.component
    const appSelector = appConfig?.appSelector || Constant.BODY
    const appTag = document.querySelector(appSelector)
    if (appTag) {
      appTag.innerHTML = Constant.EMPTY
    }
    if (Layout) {
      new Layout(new Component(params.toString()))
    } else {
      new Component(params.toString())
    }
  }

  /**
   * Check if two paths are probably the same.
   * @param {string} path1 - The path 1.
   * @param {string} path2 - The path 2.
   * @returns {boolean}
   */
  #isSamePath(path1, path2) {
    let isSamePath = true
    const path1Fragments = path1.split(Constant.SLASH)
    const path2Fragments = path2.split(Constant.SLASH)
    if (
      path1Fragments.length === 0 ||
      path2Fragments.length === 0 ||
      path1Fragments.length !== path2Fragments.length
    ) {
      isSamePath = false
    } else {
      for (let index = 0; index < path1Fragments.length; index++) {
        const fragment1 = path1Fragments[index]
        const fragment2 = path2Fragments[index]
        if (fragment1 !== fragment2 && fragment1.charAt(0) !== Constant.COLON) {
          isSamePath = false
          break
        }
      }
    }
    return isSamePath
  }

  /**
   * Get the params of a path.
   * @param {string} path1 - The path 1.
   * @param {string} path2 - The path 2.
   * @returns {string[]}
   */
  #getPathParams(path1, path2) {
    const path1Fragments = path1.split(Constant.SLASH)
    const path2Fragments = path2.split(Constant.SLASH)
    let params = []
    path1Fragments.forEach((fragment, index) => {
      if (fragment.charAt(0) === Constant.COLON) {
        params.push(path2Fragments[index])
      }
    })
    return params
  }

  /**
   * Link click event handler.
   * @param {string} path - The path to browse.
   */
  onLinkClicked(path) {
    this.#browseTo(path)
  }
}
