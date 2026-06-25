# Factory Pattern — Form Builder Example

A second, applied example of the **Factory** pattern (the repo's first is the
chair example in [`../factory`](../factory)). It models a form-building domain
as a five-level hierarchy and uses factories to create the concrete pieces from
a runtime type key.

## The domain

```
Interview        the H1 root that groups forms
  └─ Form         a collection of blocks
       └─ Block        a group of inputs
            └─ CollectionItem   a repeatable row (CollectionBlock only)
                 └─ Element     the leaf input (label, hint, isRequired, value)
```

## Why Factory fits (and where it stops)

The Factory pattern's sweet spot is **choosing which concrete type to
instantiate from a type key**, returned as an interface:

- `ElementFactory.getElement('dropdown')` → a `DropdownElement` typed as `IElement`
- `BlockFactory.getBlock('collectionBlock')` → a `CollectionBlock` typed as `IBlock`

Assembling the nested Interview→Form→Block→Element *tree* is really the
**Composite** pattern's job, not Factory's. Rather than introduce a second
pattern, the factories **compose downward**: a block builds its elements via
`ElementFactory`, a form builds its blocks via `BlockFactory`, and an interview
builds its forms. So one call builds a whole sample tree while Factory stays the
focus.

## The unified facade

`FormFactory.getType()` is a single entry point over all the per-level
factories. It uses **TypeScript function overloads** so callers get a precise
return type from one call site instead of a wide union:

```ts
const el = FormFactory.getType('dropdown')         // typed IElement
const bl = FormFactory.getType('collectionBlock')  // typed IBlock
const form = FormFactory.getType('form')           // typed IForm
const interview = FormFactory.getType('interview') // typed IInterview
```

## Files

| File | Responsibility |
| --- | --- |
| `interfaces.ts` | `IElement`, `ICollectionItem`, `IBlock`, `IForm`, `IInterview`, and the `ElementType` / `BlockType` / `ComponentType` unions |
| `element.ts` | Base `Element` class |
| `text-element.ts`, `number-element.ts`, `checkbox-element.ts`, `dropdown-element.ts` | Concrete elements; each sets its `type` and a correctly-typed default `value` |
| `element-factory.ts` | `ElementFactory.getElement(type): IElement` |
| `collection-item.ts` | `CollectionItem` — a repeatable row of elements |
| `block.ts` | Base `Block` class |
| `collection-block.ts`, `single-block.ts` | Concrete blocks |
| `block-factory.ts` | `BlockFactory.getBlock(type): IBlock` |
| `form.ts`, `interview.ts` | Container classes |
| `form-factory.ts` | `FormFactory` facade with the overloaded `getType()` |
| `client.ts` | Demonstrates standalone element creation and full-tree creation |

## Run it

```bash
npm run build
node ./dist/factory-form/client.js
```

## Output

```bash
node ./dist/factory-form/client.js
Single element:
DropdownElement {
  label: 'Dropdown',
  hint: 'Select an option',
  isRequired: false,
  type: 'dropdown',
  value: 'option-1',
  options: [
    { label: 'Option 1', value: 'option-1' },
    { label: 'Option 2', value: 'option-2' }
  ]
}

Full interview tree:
{
  "title": "Untitled Interview",
  "forms": [
    {
      "blocks": [
        {
          "type": "singleBlock",
          "items": [ ... ]
        },
        {
          "type": "collectionBlock",
          "items": [ ... ]
        }
      ]
    },
    ...
  ]
}
```
