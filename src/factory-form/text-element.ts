import Element from './element'

export default class TextElement extends Element {
    constructor() {
        super()
        this.type = 'text'
        this.label = 'Text Field'
        this.hint = 'Enter some text'
        this.value = ''
    }
}
