import { ApiSettings } from '../../../shared/settings/api.settings.js'

export class PostService {
  async getAll() {
    const response = await fetch(ApiSettings.postsApiUrl)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return await response.json()
  }

  async get(id) {
    const response = await fetch(`${ApiSettings.postsApiUrl}/${id}`)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return await response.json()
  }

  async create(post) {
    const response = await fetch(ApiSettings.postsApiUrl, {
      method: 'POST',
      body: JSON.stringify(post),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return await response.json()
  }

  async update(id, post) {
    const response = await fetch(`${ApiSettings.postsApiUrl}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(post),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return await response.json()
  }

  async patch(id, post) {
    const response = await fetch(`${ApiSettings.postsApiUrl}/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(post),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return await response.json()
  }

  async delete(id) {
    const response = await fetch(`${ApiSettings.postsApiUrl}/${id}`, {
      method: 'DELETE'
    })
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return await response.json()
  }
}
