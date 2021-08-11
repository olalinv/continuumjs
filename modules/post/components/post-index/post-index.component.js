import { Component } from '/continuum/component.js'
import { PostService } from '/modules/post/services/post.service.js'
import '/modules/post/components/post-list/post-list.component.js'

const config = {
  tagName: 'post-index',
  htmlFile: 'modules/post/components/post-index/post-index.component.html'
}
export class PostIndexComponent extends Component {
  #postService

  constructor() {
    super(config)
    this.#postService = new PostService()
  }

  connectedCallback() {
    this.#getPosts()
  }

  #getPosts() {
    this.#postService.getAll().then((posts) => {
      const postListItems = this.shadowRoot.querySelectorAll('post-list')
      postListItems.forEach(function (item) {
        item.setAttribute('posts', JSON.stringify(posts))
        item.setAttribute('posts', '')
      })
    })
  }
}
customElements.define(config.tagName, PostIndexComponent)
