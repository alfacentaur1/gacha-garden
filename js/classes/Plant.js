export default class Plant {
    constructor(name, growthTime, price, image) {
        this.name = name;
        this.growTime = growthTime; 
        this.price = price;
        this.image = image; 
        
        this.plantedAt = Date.now();
        this.isReady = false;
        this._slotID = null;
        this._fieldID = null;
    }

    set slotID(id) { this._slotID = id; }
    get slotID() { return this._slotID; }

    set fieldID(id) { this._fieldID = id; }   
    get fieldID() { return this._fieldID; }
}