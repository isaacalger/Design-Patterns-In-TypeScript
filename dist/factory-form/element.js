"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Base class for all form elements. Concrete elements set their own
// type and a correctly-typed default value in their constructors.
class Element {
    constructor() {
        this.label = '';
        this.hint = '';
        this.isRequired = false;
        this.type = 'text';
        this.value = '';
    }
}
exports.default = Element;
