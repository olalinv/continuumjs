import { Component } from '../../../continuum/component.js'

const config = {
  tagName: 'main-layout',
  htmlFile: 'shared/components/main-layout/main-layout.component.html',
  cssFile: 'shared/components/main-layout/main-layout.component.css'
}
export class MainLayoutComponent extends Component {
  constructor(component) {
    super(config, component)
  }
}
customElements.define(config.tagName, MainLayoutComponent)
