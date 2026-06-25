import { IBlock, IForm } from './interfaces'
import BlockFactory from './block-factory'

// A form is a collection of blocks
export default class Form implements IForm {
    blocks: IBlock[] = []

    constructor() {
        this.blocks = [
            BlockFactory.getBlock('singleBlock'),
            BlockFactory.getBlock('collectionBlock'),
        ]
    }
}
