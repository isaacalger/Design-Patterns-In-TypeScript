"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// A repeatable row holding one or more elements
class CollectionItem {
    constructor(elements = []) {
        this.elements = elements;
    }
}
exports.default = CollectionItem;
