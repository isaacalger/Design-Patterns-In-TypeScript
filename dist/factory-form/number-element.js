"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const element_1 = require("./element");
class NumberElement extends element_1.default {
    constructor() {
        super();
        this.type = 'number';
        this.label = 'Number Field';
        this.hint = 'Enter a number';
        this.value = 0;
    }
}
exports.default = NumberElement;
