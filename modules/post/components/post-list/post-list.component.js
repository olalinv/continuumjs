import { Component } from '../../../../continuum/component.js'

const config = {
  tagName: 'post-list',
  htmlFile: 'modules/post/components/post-list/post-list.component.html'
}
export class PostListComponent extends Component {
  static get observedAttributes() {
    return ['posts']
  }

  constructor() {
    super(config)
  }
}
customElements.define(config.tagName, PostListComponent)
