# Factory Pattern — Form Builder Example

**Date:** 2026-06-24
**Location:** `src/factory-form/`
**Pattern:** Factory (with a typed facade over per-level factories)

## Purpose

Add a second Factory-pattern example to this teaching repo, modeled on a real
form-building domain. The domain is a five-level hierarchy:

```
Interview  (the H1 root)
  └─ Form        (1–n)
       └─ Block       (1–n)
            └─ CollectionItem  (1–n; CollectionBlock only)
                 └─ Element     (1–n; the leaf input)
```

The example demonstrates the Factory pattern's sweet spot: choosing *which*
concrete type to instantiate from a runtime type key, returned as an interface.

## Why Factory fits (and where it stops)

- **Leaf/block creation** — given a type key (`'dropdown'`, `'collectionBlock'`),
  return the matching concrete instance typed as its interface. This is the
  textbook Factory use case.
- **Tree assembly** — the nested Interview→Form→Block→Element structure is a
  Composite-shaped tree. We keep this *incidental*: factories compose downward so
  the nesting falls out naturally, rather than introducing Composite/Builder as
  separate patterns to learn. Factory stays the star.

## The contract

Every factory follows the repo's existing `chair-factory.ts` convention:
`static get<Thing>(type): I<Thing>` — pass a type, get a concrete instance typed
as the interface.

A single typed entry point, `FormFactory.getType()`, dispatches across all levels
using **TypeScript function overloads** so the compiler knows the exact return
type per input:

```ts
static getType(t: 'text' | 'number' | 'checkbox' | 'dropdown'): IElement
static getType(t: 'collectionBlock' | 'singleBlock'): IBlock
static getType(t: 'form'): IForm
static getType(t: 'interview'): IInterview
static getType(t: ComponentType): IElement | IBlock | IForm | IInterview {
  // delegates to ElementFactory / BlockFactory; builds form/interview directly
}
```

Callers get precise types from one call site:

```ts
const el = FormFactory.getType('dropdown')        // typed IElement
const bl = FormFactory.getType('collectionBlock') // typed IBlock
```

## Interfaces

| Interface | Shape |
|-----------|-------|
| `IElement` | `{ label, hint, isRequired, type, value }` |
| `ICollectionItem` | `{ elements: IElement[] }` |
| `IBlock` | `{ type, items: ICollectionItem[] }` (SingleBlock uses one item / flat list) |
| `IForm` | `{ blocks: IBlock[] }` |
| `IInterview` | `{ title, forms: IForm[] }` (title = the H1) |

Supporting types: `ComponentType` (union of all type keys), a dropdown
`option` type.

## Concrete types

- **Elements** (base `Element` + concretes): `TextElement` (string value),
  `NumberElement` (number value), `CheckboxElement` (boolean value),
  `DropdownElement` (options + selected option value). Each sets its own `type`
  and a correctly-typed default `value` in its constructor — mirroring how
  `BigChair` sets default dimensions.
- **Blocks** (base `Block` + concretes): `CollectionBlock` (1–n
  `CollectionItem`s, each with 1–n elements), `SingleBlock` (a flat list of
  elements, no repeating items).
- **Containers**: `Form` (holds 1–n blocks), `Interview` (the H1 root, holds
  1–n forms).

## File layout — `src/factory-form/`

- `interfaces.ts` — all interfaces + `ComponentType` + dropdown `option` type
- `element.ts` — base Element class
- `text-element.ts`, `number-element.ts`, `checkbox-element.ts`, `dropdown-element.ts`
- `block.ts` — base Block class
- `collection-item.ts` — CollectionItem class
- `collection-block.ts`, `single-block.ts`
- `form.ts`, `interview.ts`
- `element-factory.ts` — `ElementFactory.getElement(type): IElement`
- `block-factory.ts` — `BlockFactory.getBlock(type): IBlock`
- `form-factory.ts` — `FormFactory` facade with overloaded `getType()`;
  delegates element/block types to the per-level factories and builds
  `'form'` / `'interview'` by composing downward
- `client.ts` — demonstrates standalone leaf creation and full-tree creation

## Composition strategy

Factories compose downward:
- `BlockFactory.getBlock('collectionBlock')` populates its items via
  `ElementFactory`.
- `FormFactory.getType('form')` builds a `Form` using `BlockFactory`.
- `FormFactory.getType('interview')` builds an `Interview` using
  `getType('form')`.

So one `FormFactory.getType('interview')` call returns a complete sample tree,
while `FormFactory.getType('dropdown')` still works standalone.

## Verification

- Compiles via `npm run build` (`tsc -p ./src`) with no errors.
- Runs via `node ./dist/factory-form/client.js`.
- `client.ts` logs (a) a single dropdown element and (b) a full interview tree,
  confirming the structure assembles correctly.

## Decisions made during design

- Block types limited to `CollectionBlock` + `SingleBlock` (two, so the
  factory's switch is meaningful).
- Interview/Form are created through the `FormFactory` facade rather than
  standalone factory classes, avoiding a name clash with the `Form` level.
- Type safety via overloads chosen over a plain union return so callers get
  precise types from the single entry point.

## Out of scope

- Rendering / UI. This is data-structure construction only.
- Persistence, validation logic, or dynamic option loading.
- Builder-style fluent assembly or an explicit Composite abstraction.
