export default class Pack {
    _ready = false;
    constructor(name, price, plants){
        this.name = name;
        this.price = price;
        this.plants = plants;
    }

    get ready() {
        return this._ready;
    }

    set ready(value) {
        this._ready = value;
    }

}
