"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const block_factory_1 = require("./block-factory");
// A form is a collection of blocks
class Form {
    constructor() {
        this.blocks = [];
        this.blocks = [
            block_factory_1.default.getBlock('singleBlock'),
            block_factory_1.default.getBlock('collectionBlock'),
        ];
    }
}
exports.default = Form;
