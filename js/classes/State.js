import weatherConfig from "../config/weatherConfig.js";
//class representing state of the game
//includes user's data :)

export default class State {
    static _instance = null;
    constructor(){
        //using singleton, to prevent multiple states running 
        if (State._instance) {
            return State._instance;
            }
        this.weather = weatherConfig.RAINY;    
        this.user = {
            name: 'Player',
            money: 2000,
            moneyMade: 0,
            lemonadeSold: 0,
            inventory:{
                itemInventory: {
                    'wateringCan': 0
                },
                seedInventory:{
                    starter: 0, 
                    green: 0,
                    garden: 0,
                    exotic: 0,
                    rare: 0,
                    legendary: 0
                }

            }

        }
        this.game = {
            weather: 'sunny',
            plot1: {
                full: false,
                plants:[]
            },
            plot2: {
                full: false,
                plants:[]
            }
        }
        this.latitude = null;
        State._instance = this;
    }

static get instance() {
        if (!State._instance) {
            new State(); 
        }
        return State._instance;
    }
}





