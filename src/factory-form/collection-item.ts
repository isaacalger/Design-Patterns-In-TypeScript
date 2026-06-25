import { ICollectionItem, IElement } from './interfaces'

// A repeatable row holding one or more elements
export default class CollectionItem implements ICollectionItem {
    elements: IElement[]

    constructor(elements: IElement[] = []) {
        this.elements = elements
    }
}
