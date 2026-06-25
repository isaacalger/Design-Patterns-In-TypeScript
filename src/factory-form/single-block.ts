import Block from './block'
import CollectionItem from './collection-item'
import ElementFactory from './element-factory'

// A single block is a flat group of elements (one item, no repetition)
export default class SingleBlock extends Block {
    constructor() {
        super()
        this.type = 'singleBlock'
        this.items = [
            new CollectionItem([
                ElementFactory.getElement('text'),
                ElementFactory.getElement('checkbox'),
                ElementFactory.getElement('dropdown'),
            ]),
        ]
    }
}
