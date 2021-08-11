import { Component } from '../../../../continuum/component.js'
import { PostService } from '../../../../modules/post/services/post.service.js'

const config = {
  tagName: 'post-detail',
  htmlFile: 'modules/post/components/post-detail/post-detail.component.html'
}
export class PostDetailComponent extends Component {
  #postId
  #postService

  static get observedProperties() {
    return ['post']
  }

  constructor(id) {
    super(config)
    this.#postId = id
    this.#postService = new PostService()
  }

  connectedCallback() {
    this.getPost(this.#postId)
  }

  getPost(id) {
    this.#postService.get(id).then((post) => {
      this.post = post
    })
  }
}
customElements.define(config.tagName, PostDetailComponent)