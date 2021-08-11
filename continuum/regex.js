export class Regex {
  static removeFirstSlash = (text) => {
    return text.replace(/^\/+/, '')
  }
}
