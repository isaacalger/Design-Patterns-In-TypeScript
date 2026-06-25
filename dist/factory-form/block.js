"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Base class for all blocks. Concrete blocks set their own type and
// populate their items (composing ElementFactory) in their constructors.
class Block {
    constructor() {
        this.type = 'singleBlock'; // overridden by each concrete block
        this.items = [];
    }
}
exports.default = Block;
