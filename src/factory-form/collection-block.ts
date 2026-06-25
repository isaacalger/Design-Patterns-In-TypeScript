import Block from './block'
import CollectionItem from './collection-item'
import ElementFactory from './element-factory'

// A collection block holds repeatable items, each with its own elements
export default class CollectionBlock extends Block {
    constructor() {
        super()
        this.type = 'collectionBlock'
        this.items = [
            new CollectionItem([
                ElementFactory.getElement('text'),
                ElementFactory.getElement('number'),
            ]),
            new CollectionItem([
                ElementFactory.getElement('text'),
                ElementFactory.getElement('number'),
            ]),
        ]
    }
}
