import { DropdownOption, ElementType, IElement } from './interfaces'

// Base class for all form elements. Concrete elements set their own
// type and a correctly-typed default value in their constructors.
export default class Element implements IElement {
    label = ''
    hint = ''
    isRequired = false
    type: ElementType = 'text'
    value: string | number | boolean = ''
    options?: DropdownOption[]
}
