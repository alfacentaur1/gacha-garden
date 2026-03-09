export default class Plant {
    plantID;
    fieldID;
    

    constructor(name, growthTime, waterNeeds, price){
        this.name = name;
        this.growthTime = growthTime;
        this.waterNeeds = waterNeeds;
        this.price = price;
    }
}