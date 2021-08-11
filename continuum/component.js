import { appConfig } from '../config/app.config.js'
import { Constant } from './constant.js'

export class Component extends HTMLElement {
  #layout = null

  /**
   * Create a component.
   * @constructor
   * @param {Object} config - The config of the component.
   * @param {Component} [childComponent=null] - An optional component loaded by a layout.
   */
  constructor(config, childComponent = null) {
    console.log('config', config)
    console.log('document.currentScript', globalThis)
    super()
    const componentConstructor = customElements.get(config.tagName)
    this.#assignProperties(componentConstructor)
    this.#loadTemplate(config, childComponent)
  }

  /**
   * Assign properties to a component.
   * @param {string} tagName - The name of the tag.
   */
  #assignProperties(tagName) {
    const prototype = Reflect.get(tagName, 'prototype')
    const observedProperties = Reflect.get(tagName, 'observedProperties')
    observedProperties?.forEach((propertyName) => {
      if (!prototype.hasOwnProperty(propertyName)) {
        Object.defineProperty(prototype, propertyName, {
          get() {
            return propertyName
          },
          set(propertyValue) {
            this.#bindProperties(propertyValue, propertyName)
          }
        })
      }
    })
  }

  /**
   * Bind properties of a component.
   * @param {Object} propertyValue - The value of the property.
   * @param {string} propertyName - The name of the property.
   */
  #bindProperties(propertyValue, propertyName) {
    const modelName = this.shadowRoot.querySelector(
      `[data-attr="${propertyName}"]`
    ).dataset.model
    const html = this.shadowRoot.querySelector(
      `[data-model="${modelName}"]`
    ).innerHTML
    const model = {}
    model[modelName] = propertyValue
    const template = document.createElement('template')
    template.innerHTML = this.#interpolateTemplate(model, html)
    this.shadowRoot.appendChild(template.content.cloneNode(true))
  }

  /**
   * Interpolate model data in HTML template.
   * @param {Object} model - The model data.
   * @param {string} html - The HTML template.
   */
  #interpolateTemplate(model, html) {
    const keys = Object.keys(model)
    const values = Object.values(model)
    return new Function(...keys, `return \`${html}\``)(...values)
  }

  /**
   * Load template of a component.
   * @param {Object} config - The config of the component.
   * @param {Object} childComponent - An optional component loaded by a layout.
   */
  #loadTemplate(config, childComponent) {
    this.attachShadow({ mode: 'open' })
    this.#appendStyles(config.cssFile)
    fetch(config.htmlFile)
      .then((response) => response.text())
      .then((html) => {
        const template = document.createElement('template')
        template.innerHTML = html
        this.shadowRoot.appendChild(template.content.cloneNode(true))
        if (!this.parentNode) {
          if (childComponent) {
            this.layout = this.shadowRoot
            this.shadowRoot.querySelector('slot').appendChild(childComponent)
            const appSelector = appConfig?.appSelector || Constant.BODY
            const appTag = document.querySelector(appSelector)
            if (appTag) {
              appTag.appendChild(this)
            }
          } else {
            if (this.layout) {
              this.layout.querySelector('slot').appendChild(this)
            }
          }
        }
        this.onLoad()
      })
      .catch((error) => console.error(error))
  }

  #appendStyles(cssFile) {
    if (cssFile) {
      const link = document.createElement('link')
      link.setAttribute('rel', 'stylesheet')
      link.setAttribute('href', cssFile)
      this.shadowRoot.append(link)
    }
  }

  adoptedCallback() {
    console.log('adoptedCallback')
  }

  attributeChangedCallback(attrName, oldValue, newValue) {
    // console.log('attributeChangedCallback')
    console.log('attrName', attrName)
    if (newValue) {
      const value = JSON.parse(newValue)
      if (value instanceof Array) {
        value.forEach((item) => {
          this.#bindProperties(item, attrName)
        })
      } else if (value instanceof Object) {
        this.#bindProperties(value, attrName)
      }
    }
  }

  connectedCallback() {
    console.log('connectedCallback')
    if (this.shadowRoot.isConnected) {
      // this.onConnect()
    }
  }

  disconnectedCallback() {
    console.log('disconnectedCallback')
    if (!this.shadowRoot.isConnected) {
      // this.onDisconnect()
    }
  }

  onLoad() {
    console.log('onLoad')
  }

  onUnload() {
    console.log('onUnload')
  }
}
