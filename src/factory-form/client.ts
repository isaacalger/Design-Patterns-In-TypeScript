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
