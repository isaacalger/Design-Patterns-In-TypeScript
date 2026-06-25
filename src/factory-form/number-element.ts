import Element from './element'

export default class NumberElement extends Element {
    constructor() {
        super()
        this.type = 'number'
        this.label = 'Number Field'
        this.hint = 'Enter a number'
        this.value = 0
    }
}
