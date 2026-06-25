import Element from './element'

export default class CheckboxElement extends Element {
    constructor() {
        super()
        this.type = 'checkbox'
        this.label = 'Checkbox'
        this.hint = 'Tick if applicable'
        this.value = false
    }
}
