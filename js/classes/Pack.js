export default class Pack {
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

    //distribution function
    openPack() {
        const totalChance = this.plants.reduce((sum, plant) => sum + plant.chance, 0);
        const randomChance = Math.random() * totalChance;
        let cumulativeChance = 0;
        for (const plant of this.plants) {
            cumulativeChance += plant.chance;
            if (randomChance < cumulativeChance) {
                return plant.plant;
            }   
    }}
}
