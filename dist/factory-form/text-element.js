"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const element_1 = require("./element");
class TextElement extends element_1.default {
    constructor() {
        super();
        this.type = 'text';
        this.label = 'Text Field';
        this.hint = 'Enter some text';
        this.value = '';
    }
}
exports.default = TextElement;
