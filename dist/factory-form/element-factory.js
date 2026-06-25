"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const text_element_1 = require("./text-element");
const number_element_1 = require("./number-element");
const checkbox_element_1 = require("./checkbox-element");
const dropdown_element_1 = require("./dropdown-element");
class ElementFactory {
    static getElement(type) {
        if (type === 'number') {
            return new number_element_1.default();
        }
        else if (type === 'checkbox') {
            return new checkbox_element_1.default();
        }
        else if (type === 'dropdown') {
            return new dropdown_element_1.default();
        }
        else {
            return new text_element_1.default();
        }
    }
}
exports.default = ElementFactory;
