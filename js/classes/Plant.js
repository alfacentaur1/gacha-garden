export default class Plant {
    constructor(name, growthTime, price, image) {
        this.name = name;
        this.growTime = growthTime; 
        this.price = price;
        this.image = image; 
    
        this.plantedAt = Date.now();
        this.isReady = false;
    }

}