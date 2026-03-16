import Plant from './Plant.js'; 

export default class Pack {
    constructor(name, price, loot) { 
        this.name = name;
        this.price = price;
    
        this.loot = loot; 
    }
    //distribution function
    openPack() {
        if (!this.loot || this.loot.length === 0) return null;
        //calculate total chance
        const totalChance = this.loot.reduce((sum, item) => sum + item.chance, 0);
        const randomChance = Math.random() * totalChance;
        let cumulativeChance = 0;

        //distribution function 
        for (const item of this.loot) {
            cumulativeChance += item.chance;
            if (randomChance < cumulativeChance) {
                const p = item.plant;
                return new Plant(
                    p.name, 
                    p.growthTime, 
                    p.sellPrice, 
                    p.image
                );
            }
        }
        return null;
    }
}