export default class Plant {
    //private 
    _slotID = null; 
    _fieldID = null; 

    constructor(name, growthTime, price) {
        this.name = name;
        this.growthTime = growthTime;
        this.price = price;
        this.plantedAt = Date.now();
        this.isReady = false;
    }

    set slotID(id) {
        this._slotID = id;
    }

    get slotID() {
        return this._slotID;
    }

    set fieldID(id) {
        this._fieldID = id;
    }   

    get fieldID() {
        return this._fieldID;
    }
}