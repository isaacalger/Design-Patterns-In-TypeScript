// Shared types and interfaces for the factory-form example

// The type keys a leaf Element can take
export type ElementType = 'text' | 'number' | 'checkbox' | 'dropdown'

// The type keys a Block can take
export type BlockType = 'collectionBlock' | 'singleBlock'

// Every type key the FormFactory facade understands
export type ComponentType = ElementType | BlockType | 'form' | 'interview'

export type DropdownOption = {
    label: string
    value: string
}

// The leaf input component
export interface IElement {
    label: string
    hint: string
    isRequired: boolean
    type: ElementType
    value: string | number | boolean
    options?: DropdownOption[]
}

// A repeatable row of elements inside a CollectionBlock
export interface ICollectionItem {
    elements: IElement[]
}

// A group of inputs
export interface IBlock {
    type: BlockType
    items: ICollectionItem[]
}

// A collection of blocks
export interface IForm {
    blocks: IBlock[]
}

// The H1 root that groups forms
export interface IInterview {
    title: string
    forms: IForm[]
}
