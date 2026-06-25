"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tabby = exports.Cat = void 0;
class Cat {
    constructor(name) {
        this.timesMeowed = 0;
        this.name = name;
    }
    meow() {
        console.log(`${this.name} says meow`);
        this.timesMeowed++;
        if (this.timesMeowed > 1) {
            this.purr();
        }
    }
    purr() {
        console.log(`${this.name} is purring`);
    }
    sleep() {
        console.log(`${this.name} is sleeping`);
    }
}
exports.Cat = Cat;
class Tabby extends Cat {
    constructor(name) {
        super(name);
    }
    meow() {
        super.meow();
        if (this.timesMeowed > 2) {
            this.timesMeowed = 0;
            this.sleep();
        }
    }
}
exports.Tabby = Tabby;
