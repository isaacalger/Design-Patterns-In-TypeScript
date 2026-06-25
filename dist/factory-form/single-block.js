"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const block_1 = require("./block");
const collection_item_1 = require("./collection-item");
const element_factory_1 = require("./element-factory");
// A single block is a flat group of elements (one item, no repetition)
class SingleBlock extends block_1.default {
    constructor() {
        super();
        this.type = 'singleBlock';
        this.items = [
            new collection_item_1.default([
                element_factory_1.default.getElement('text'),
                element_factory_1.default.getElement('checkbox'),
                element_factory_1.default.getElement('dropdown'),
            ]),
        ];
    }
}
exports.default = SingleBlock;
