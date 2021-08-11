import { Component } from '../../../continuum/component.js'

const config = {
  tagName: 'page-not-found',
  htmlFile: 'shared/components/page-not-found/page-not-found.component.html'
}
export class PageNotFoundComponent extends Component {
  constructor(component) {
    super(config, component)
  }
}
customElements.define(config.tagName, PageNotFoundComponent)
