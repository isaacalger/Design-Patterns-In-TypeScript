import { ComponentType, IBlock, IElement, IForm, IInterview } from './interfaces'
import ElementFactory from './element-factory'
import BlockFactory from './block-factory'
import Form from './form'
import Interview from './interview'

export default class FormFactory {
    static getType(type: 'text' | 'number' | 'checkbox' | 'dropdown'): IElement
    static getType(type: 'collectionBlock' | 'singleBlock'): IBlock
    static getType(type: 'form'): IForm
    static getType(type: 'interview'): IInterview
    static getType(
        type: ComponentType
    ): IElement | IBlock | IForm | IInterview {
        switch (type) {
            case 'text':
            case 'number':
            case 'checkbox':
            case 'dropdown':
                return ElementFactory.getElement(type)
            case 'collectionBlock':
            case 'singleBlock':
                return BlockFactory.getBlock(type)
            case 'form':
                return new Form()
            case 'interview':
                return new Interview()
        }
    }
}
