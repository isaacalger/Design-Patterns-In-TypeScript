import Element from './element'

export default class DropdownElement extends Element {
    constructor() {
        super()
        this.type = 'dropdown'
        this.label = 'Dropdown'
        this.hint = 'Select an option'
        this.options = [
            { label: 'Option 1', value: 'option-1' },
            { label: 'Option 2', value: 'option-2' },
        ]
        this.value = this.options[0].value
    }
}
