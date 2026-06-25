# Factory Form Builder Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a second Factory-pattern example modeling a form-builder hierarchy (Interview → Form → Block → CollectionItem → Element), with a single typed `FormFactory.getType()` entry point.

**Architecture:** Per-level factories (`ElementFactory`, `BlockFactory`) each follow the repo's `static get<Thing>(type): I<Thing>` convention. A `FormFactory` facade exposes one overloaded `getType()` that returns precise types per input and delegates downward; factories compose so one `getType('interview')` call builds a full sample tree.

**Tech Stack:** TypeScript (strict, ES2015, CommonJS), compiled with `tsc -p ./src`. No unit-test runner exists in this repo — verification is "compiles clean + `client.ts` runs and logs expected output", matching every other example here.

---

## Verification model (read first)

This repo has no Jest/Mocha. Do not add one. The verification gate for every task is:

```bash
npm run build
```
Expected: exits 0, no TypeScript errors. The final task additionally runs `client.ts` and checks its console output.

All files live in `src/factory-form/`. Compiled output lands in `dist/factory-form/` (per `src/tsconfig.json`: `outDir: ../dist`, `rootDir: ./`).

---

## File Structure

- `src/factory-form/interfaces.ts` — all interfaces + `ComponentType` + `DropdownOption`
- `src/factory-form/element.ts` — base `Element`
- `src/factory-form/text-element.ts` / `number-element.ts` / `checkbox-element.ts` / `dropdown-element.ts` — concrete elements
- `src/factory-form/element-factory.ts` — `ElementFactory.getElement(type): IElement`
- `src/factory-form/collection-item.ts` — `CollectionItem`
- `src/factory-form/block.ts` — base `Block`
- `src/factory-form/collection-block.ts` / `single-block.ts` — concrete blocks
- `src/factory-form/block-factory.ts` — `BlockFactory.getBlock(type): IBlock`
- `src/factory-form/form.ts` / `interview.ts` — containers
- `src/factory-form/form-factory.ts` — `FormFactory` facade (overloaded `getType()`)
- `src/factory-form/client.ts` — demonstrates standalone + full-tree usage

---

### Task 1: Interfaces and shared types

**Files:**
- Create: `src/factory-form/interfaces.ts`

- [ ] **Step 1: Write `interfaces.ts`**

```ts
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
```

- [ ] **Step 2: Compile**

Run: `npm run build`
Expected: exits 0, no errors.

- [ ] **Step 3: Commit**

```bash
git add src/factory-form/interfaces.ts
git commit -m "feat(factory-form): add interfaces and shared types"
```

---

### Task 2: Base Element and concrete elements

**Files:**
- Create: `src/factory-form/element.ts`
- Create: `src/factory-form/text-element.ts`
- Create: `src/factory-form/number-element.ts`
- Create: `src/factory-form/checkbox-element.ts`
- Create: `src/factory-form/dropdown-element.ts`

- [ ] **Step 1: Write `element.ts` (base class)**

```ts
import { ComponentType, DropdownOption, IElement } from './interfaces'

// Base class for all form elements. Concrete elements set their own
// type and a correctly-typed default value in their constructors.
export default class Element implements IElement {
    label = ''
    hint = ''
    isRequired = false
    type: ComponentType = 'text'
    value: string | number | boolean = ''
    options?: DropdownOption[]
}
```

- [ ] **Step 2: Write `text-element.ts`**

```ts
import Element from './element'

export default class TextElement extends Element {
    constructor() {
        super()
        this.type = 'text'
        this.label = 'Text Field'
        this.hint = 'Enter some text'
        this.value = ''
    }
}
```

- [ ] **Step 3: Write `number-element.ts`**

```ts
import Element from './element'

export default class NumberElement extends Element {
    constructor() {
        super()
        this.type = 'number'
        this.label = 'Number Field'
        this.hint = 'Enter a number'
        this.value = 0
    }
}
```

- [ ] **Step 4: Write `checkbox-element.ts`**

```ts
import Element from './element'

export default class CheckboxElement extends Element {
    constructor() {
        super()
        this.type = 'checkbox'
        this.label = 'Checkbox'
        this.hint = 'Tick if applicable'
        this.value = false
    }
}
```

- [ ] **Step 5: Write `dropdown-element.ts`**

```ts
import Element from './element'

export default class DropdownElement extends Element {
    constructor() {
        super()
        this.type = 'dropdown'
        this.label = 'Dropdown'
        this.hint = 'Select an option'
        this.options = [
            { label: 'Option 1', value: 'option-1' },
            { label: 'Option 2', value: 'option-2' },
        ]
        this.value = this.options[0].value
    }
}
```

- [ ] **Step 6: Compile**

Run: `npm run build`
Expected: exits 0, no errors.

- [ ] **Step 7: Commit**

```bash
git add src/factory-form/element.ts src/factory-form/text-element.ts src/factory-form/number-element.ts src/factory-form/checkbox-element.ts src/factory-form/dropdown-element.ts
git commit -m "feat(factory-form): add base element and concrete element types"
```

---

### Task 3: ElementFactory

**Files:**
- Create: `src/factory-form/element-factory.ts`

- [ ] **Step 1: Write `element-factory.ts`**

```ts
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
```

- [ ] **Step 2: Compile**

Run: `npm run build`
Expected: exits 0, no errors.

- [ ] **Step 3: Commit**

```bash
git add src/factory-form/element-factory.ts
git commit -m "feat(factory-form): add ElementFactory"
```

---

### Task 4: CollectionItem, base Block, and concrete blocks

**Files:**
- Create: `src/factory-form/collection-item.ts`
- Create: `src/factory-form/block.ts`
- Create: `src/factory-form/collection-block.ts`
- Create: `src/factory-form/single-block.ts`

- [ ] **Step 1: Write `collection-item.ts`**

```ts
import { ICollectionItem, IElement } from './interfaces'

// A repeatable row holding one or more elements
export default class CollectionItem implements ICollectionItem {
    elements: IElement[] = []

    constructor(elements: IElement[] = []) {
        this.elements = elements
    }
}
```

- [ ] **Step 2: Write `block.ts` (base class)**

```ts
import { ComponentType, IBlock, ICollectionItem } from './interfaces'

// Base class for all blocks. Concrete blocks set their own type and
// populate their items (composing ElementFactory) in their constructors.
export default class Block implements IBlock {
    type: ComponentType = 'singleBlock'
    items: ICollectionItem[] = []
}
```

- [ ] **Step 3: Write `collection-block.ts`**

```ts
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
```

- [ ] **Step 4: Write `single-block.ts`**

```ts
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
```

- [ ] **Step 5: Compile**

Run: `npm run build`
Expected: exits 0, no errors.

- [ ] **Step 6: Commit**

```bash
git add src/factory-form/collection-item.ts src/factory-form/block.ts src/factory-form/collection-block.ts src/factory-form/single-block.ts
git commit -m "feat(factory-form): add CollectionItem and block types"
```

---

### Task 5: BlockFactory

**Files:**
- Create: `src/factory-form/block-factory.ts`

- [ ] **Step 1: Write `block-factory.ts`**

```ts
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
```

- [ ] **Step 2: Compile**

Run: `npm run build`
Expected: exits 0, no errors.

- [ ] **Step 3: Commit**

```bash
git add src/factory-form/block-factory.ts
git commit -m "feat(factory-form): add BlockFactory"
```

---

### Task 6: Form and Interview containers

**Files:**
- Create: `src/factory-form/form.ts`
- Create: `src/factory-form/interview.ts`

- [ ] **Step 1: Write `form.ts`**

```ts
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
```

- [ ] **Step 2: Write `interview.ts`**

```ts
import { IForm, IInterview } from './interfaces'
import Form from './form'

// An interview is the H1 root that groups forms
export default class Interview implements IInterview {
    title = 'Untitled Interview'
    forms: IForm[] = []

    constructor() {
        this.forms = [new Form(), new Form()]
    }
}
```

- [ ] **Step 3: Compile**

Run: `npm run build`
Expected: exits 0, no errors.

- [ ] **Step 4: Commit**

```bash
git add src/factory-form/form.ts src/factory-form/interview.ts
git commit -m "feat(factory-form): add Form and Interview containers"
```

---

### Task 7: FormFactory facade with overloaded getType

**Files:**
- Create: `src/factory-form/form-factory.ts`

- [ ] **Step 1: Write `form-factory.ts`**

The four overload signatures give callers precise return types; the
implementation signature handles every `ComponentType`. The switch is
exhaustive over the union, so no trailing return is needed.

```ts
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
```

- [ ] **Step 2: Compile**

Run: `npm run build`
Expected: exits 0, no errors. (If TS reports "Not all code paths return a value", the switch is not exhaustive — verify every `ComponentType` member has a case.)

- [ ] **Step 3: Commit**

```bash
git add src/factory-form/form-factory.ts
git commit -m "feat(factory-form): add FormFactory facade with typed overloads"
```

---

### Task 8: Client demonstration and final verification

**Files:**
- Create: `src/factory-form/client.ts`

- [ ] **Step 1: Write `client.ts`**

```ts
// Factory Use Case Example — Form Builder
import FormFactory from './form-factory'

// 1. Build a single element directly — statically typed as IElement
const DROPDOWN = FormFactory.getType('dropdown')
console.log('Single element:')
console.log(DROPDOWN)

// 2. Build a whole interview tree — statically typed as IInterview
const INTERVIEW = FormFactory.getType('interview')
console.log('\nFull interview tree:')
console.log(JSON.stringify(INTERVIEW, null, 2))
```

- [ ] **Step 2: Compile**

Run: `npm run build`
Expected: exits 0, no errors.

- [ ] **Step 3: Run the client and verify output**

Run: `node ./dist/factory-form/client.js`
Expected: prints a `Single element:` section showing the dropdown object
(`type: 'dropdown'`, two `options`, `value: 'option-1'`), then a
`Full interview tree:` JSON block with `title`, two `forms`, each with two
`blocks` (a `singleBlock` and a `collectionBlock`), and the collectionBlock
having two `items` each containing elements.

- [ ] **Step 4: Commit**

```bash
git add src/factory-form/client.ts
git commit -m "feat(factory-form): add client demonstration"
```

---

## Self-Review

**Spec coverage:**
- Five-level hierarchy (Interview/Form/Block/CollectionItem/Element) — Tasks 1, 2, 4, 6 ✓
- Element types Text/Number/Checkbox/Dropdown returned as `IElement` — Tasks 2, 3 ✓
- Block types CollectionBlock/SingleBlock returned as `IBlock` — Tasks 4, 5 ✓
- Per-level factories on `static get<Thing>(type)` convention — Tasks 3, 5 ✓
- Unified `FormFactory.getType()` with TypeScript overloads — Task 7 ✓
- Factories compose downward (one call builds full tree) — Tasks 4, 6, 8 ✓
- Verification: compiles + client runs with expected output — Task 8 ✓

**Placeholder scan:** No TBDs; every code step shows complete code. ✓

**Type consistency:** `ComponentType`, `IElement.options?`, `ICollectionItem.elements`, `IBlock.items`, `IForm.blocks`, `IInterview.{title,forms}`, `getElement`, `getBlock`, `getType` used identically across all tasks. Dropdown `value` (`option-1`) matches its `options[0].value`. ✓

**Note on `options`:** the spec's documented element shape is `{ label, hint, isRequired, type, value }`; the plan adds an *optional* `options?` field so `DropdownElement` can carry its choices without breaking that shape — a minor, faithful refinement.
