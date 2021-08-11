export class ApiSettings {
  // API
  static #API_URL = 'https://jsonplaceholder.typicode.com'
  static #POSTS_API_URL = `${this.#API_URL}/posts`

  // Getters
  static get apiUrl() { return this.#API_URL }
  static get postsApiUrl() { return this.#POSTS_API_URL }
}
