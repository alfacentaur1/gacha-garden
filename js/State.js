export default class State{
    constructor(){
        //using singleton, to prevent multiple states running 
        if (State._instance) {
            return State._instance;
            }

        this.ui = {
            currentPage: 'home',
            currentTab: 'home'
        }
        this.user = {
            name: 'Player',
            money: 1000,
            moneyMade: 0,
            lemonadeSold: 0,
            inventory:{
                itemInventory: {
                    'shovel': 0,    
                    'wateringCan': 0
                },
                seedInventory:{
                    starterPack: 0, 
                    greenPack: 0,
                    gardenPack: 0,
                    exoticPack: 0,
                    rarePack: 0,
                    legendaryPack: 0
                }

            }

        }
        this.game= {
            weather: 'sunny',
            plot1: {
                full: false,
                plants:[]
            },
            plot2: {
                full: false,
                plants:[]
            },
        }
    }
}





