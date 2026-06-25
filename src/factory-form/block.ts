import { ComponentType, IBlock, ICollectionItem } from './interfaces'

// Base class for all blocks. Concrete blocks set their own type and
// populate their items (composing ElementFactory) in their constructors.
export default class Block implements IBlock {
    type: ComponentType = 'singleBlock'
    items: ICollectionItem[] = []
}
