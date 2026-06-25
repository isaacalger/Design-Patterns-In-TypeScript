// Shared types and interfaces for the factory-form example

export type ComponentType =
    | 'text'
    | 'number'
    | 'checkbox'
    | 'dropdown'
    | 'collectionBlock'
    | 'singleBlock'
    | 'form'
    | 'interview'

export type DropdownOption = {
    label: string
    value: string
}

// The leaf input component
export interface IElement {
    label: string
    hint: string
    isRequired: boolean
    type: ComponentType
    value: string | number | boolean
    options?: DropdownOption[]
}

// A repeatable row of elements inside a CollectionBlock
export interface ICollectionItem {
    elements: IElement[]
}

// A group of inputs
export interface IBlock {
    type: ComponentType
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
