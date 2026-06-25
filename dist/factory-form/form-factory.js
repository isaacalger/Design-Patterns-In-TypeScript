"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const element_factory_1 = require("./element-factory");
const block_factory_1 = require("./block-factory");
const form_1 = require("./form");
const interview_1 = require("./interview");
class FormFactory {
    static getType(type) {
        switch (type) {
            case 'text':
            case 'number':
            case 'checkbox':
            case 'dropdown':
                return element_factory_1.default.getElement(type);
            case 'collectionBlock':
            case 'singleBlock':
                return block_factory_1.default.getBlock(type);
            case 'form':
                return new form_1.default();
            case 'interview':
                return new interview_1.default();
        }
    }
}
exports.default = FormFactory;
