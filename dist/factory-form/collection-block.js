"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const block_1 = require("./block");
const collection_item_1 = require("./collection-item");
const element_factory_1 = require("./element-factory");
// A collection block holds repeatable items, each with its own elements
class CollectionBlock extends block_1.default {
    constructor() {
        super();
        this.type = 'collectionBlock';
        this.items = [
            new collection_item_1.default([
                element_factory_1.default.getElement('text'),
                element_factory_1.default.getElement('number'),
            ]),
            new collection_item_1.default([
                element_factory_1.default.getElement('text'),
                element_factory_1.default.getElement('number'),
            ]),
        ];
    }
}
exports.default = CollectionBlock;
