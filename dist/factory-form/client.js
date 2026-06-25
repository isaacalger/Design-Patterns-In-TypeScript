"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Factory Use Case Example — Form Builder
const form_factory_1 = require("./form-factory");
// 1. Build a single element directly — statically typed as IElement
const DROPDOWN = form_factory_1.default.getType('dropdown');
console.log('Single element:');
console.log(DROPDOWN);
// 2. Build a whole interview tree — statically typed as IInterview
const INTERVIEW = form_factory_1.default.getType('interview');
console.log('\nFull interview tree:');
console.log(JSON.stringify(INTERVIEW, null, 2));
