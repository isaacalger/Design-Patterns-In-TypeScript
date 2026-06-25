"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const collection_block_1 = require("./collection-block");
const single_block_1 = require("./single-block");
class BlockFactory {
    static getBlock(type) {
        if (type === 'collectionBlock') {
            return new collection_block_1.default();
        }
        else {
            return new single_block_1.default();
        }
    }
}
exports.default = BlockFactory;
