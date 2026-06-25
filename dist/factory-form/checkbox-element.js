"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const element_1 = require("./element");
class CheckboxElement extends element_1.default {
    constructor() {
        super();
        this.type = 'checkbox';
        this.label = 'Checkbox';
        this.hint = 'Tick if applicable';
        this.value = false;
    }
}
exports.default = CheckboxElement;
