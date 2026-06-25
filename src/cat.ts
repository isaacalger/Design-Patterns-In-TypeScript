import exp = require("node:constants");

export class Cat {
    readonly name: string
    timesMeowed: number = 0;
    
    constructor(name: string) {
        this.name = name
    }

    public meow(): void {
        console.log(`${this.name} says meow`);
        this.timesMeowed++;

        if(this.timesMeowed > 1){
            this.purr();
        }
    }

    private purr(): void{
        console.log(`${this.name} is purring`);
    }

    protected sleep(): void{
        console.log(`${this.name} is sleeping`);
    }
}

export class Tabby extends Cat{
    constructor(name: string){
        super(name);
    }

    public meow(): void {
        super.meow();

        if(this.timesMeowed > 2){
            this.timesMeowed = 0;
            this.sleep();
        }
    }
}