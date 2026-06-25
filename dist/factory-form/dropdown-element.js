"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const element_1 = require("./element");
class DropdownElement extends element_1.default {
    constructor() {
        super();
        this.type = 'dropdown';
        this.label = 'Dropdown';
        this.hint = 'Select an option';
        this.options = [
            { label: 'Option 1', value: 'option-1' },
            { label: 'Option 2', value: 'option-2' },
        ];
        this.value = this.options[0].value;
    }
}
exports.default = DropdownElement;
