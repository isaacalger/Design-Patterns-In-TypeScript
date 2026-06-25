"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const form_1 = require("./form");
// An interview is the H1 root that groups forms
class Interview {
    constructor() {
        this.title = 'Untitled Interview';
        this.forms = [];
        this.forms = [new form_1.default(), new form_1.default()];
    }
}
exports.default = Interview;
