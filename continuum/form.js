import { Constant } from './constant'

export class Form {
  static FORM_CONTROLS = [Constant.INPUT, Constant.TEXTAREA, Constant.SELECT]

  static setModel = (sourceModel, form) => {
    const model = JSON.parse(JSON.stringify(sourceModel))
    const controls = form?.elements
    if (!model) return sourceModel
    if (controls && Object.keys(controls).length > 0) {
      for (const property in model) {
        if (
          model.hasOwnProperty(property) &&
          Object.keys(controls).includes(property) &&
          this.FORM_CONTROLS.includes(controls[property].nodeName)
        ) {
          model[property] = controls[property].value
        }
      }
    }
    return model
  }
}
