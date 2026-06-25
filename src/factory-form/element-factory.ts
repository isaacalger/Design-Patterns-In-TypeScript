import { IElement } from './interfaces'
import TextElement from './text-element'
import NumberElement from './number-element'
import CheckboxElement from './checkbox-element'
import DropdownElement from './dropdown-element'

export default class ElementFactory {
    static getElement(type: string): IElement {
        if (type === 'number') {
            return new NumberElement()
        } else if (type === 'checkbox') {
            return new CheckboxElement()
        } else if (type === 'dropdown') {
            return new DropdownElement()
        } else {
            return new TextElement()
        }
    }
}
