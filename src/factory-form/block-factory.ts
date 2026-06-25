import { IBlock } from './interfaces'
import CollectionBlock from './collection-block'
import SingleBlock from './single-block'

export default class BlockFactory {
    static getBlock(type: string): IBlock {
        if (type === 'collectionBlock') {
            return new CollectionBlock()
        } else {
            return new SingleBlock()
        }
    }
}
