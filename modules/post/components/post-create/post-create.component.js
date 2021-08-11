import { Component } from '/continuum/component'
import { PostService } from '/modules/post/services/post.service'
import { Post } from '../../models/post.model'
import { Form } from '../../../../continuum/form'

const config = {
  tagName: 'post-create',
  htmlFile: 'modules/post/components/post-create/post-create.component.html',
  cssFile: 'modules/post/components/post-create/post-create.component.css'
}
export class PostCreateComponent extends Component {
  #postService
  #post

  get controls() {
    return this.form.elements
  }

  get form() {
    return this.shadowRoot.querySelector('#post-create-form')
  }

  constructor() {
    super(config)
    this.#postService = new PostService()
    this.#post = new Post()
  }

  onLoad() {
    // Events
    this.form.addEventListener('submit', (event) => {
      event.preventDefault()
      this.#onSubmit()
    })
  }

  #createPost(post) {
    this.#postService.create(post).then((newPost) => {
      alert(`Post saved: ${JSON.stringify(newPost)}`)
    })
  }

  #onSubmit() {
    const post = Form.setModel(this.#post, this.form)
    this.#createPost(post)
  }
}
customElements.define(config.tagName, PostCreateComponent)
