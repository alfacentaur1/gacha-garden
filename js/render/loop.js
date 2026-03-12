import State from '../classes/State.js';
import weatherConfig from '../config/weatherConfig.js';
import Toastify from 'https://cdn.skypack.dev/toastify-js';
import { renderGame } from './game.js';


export default function gameLoopRun() {
    setInterval(gameLoop, 1000); //run game loop every second


function gameLoop() {
    const state = State.instance;
    const now = Date.now();
    //update tick for plants
    ['plot1', 'plot2'].forEach(plot => {
        state.game[plot].plants.forEach(plant => {
            if (!plant.isReady) {
                plant.growTime -= 1*state.weather.growthModifier; //weather affects growth time
                if (plant.growTime <= 0) {
                    plant.isReady = true;
                }
            }
        });
    }
);
    weatherChangeLoop()
}

function weatherChangeLoop() {
    const appContainer = document.getElementById('app');
    const state = State.instance;
    if (Math.random() < 0.01) { // 1% chance of weather change
        const weatherTypes = Object.values(weatherConfig);
        let weather = weatherTypes[Math.floor(Math.random() * weatherTypes.length)]
        if(weather.type !== state.weather.type){
            state.weather = weather;
        }
Toastify({
    text: `Weather: ${state.weather.type.toUpperCase()}\n${state.weather.perk}`,
    duration: 3000,
    gravity: "top", 
    position: "center",
    stopOnFocus: true, 
    style: {
        position: "fixed", 
        zIndex: "9999",    
        top: "20px",       
        background: "#4a7c3f", 
        border: "2px solid #a09880", 
        boxShadow: "0 4px 0 #3a6b30", 
        fontFamily: "'Lato', sans-serif",
        fontSize: "0.8rem",
        borderRadius: "0px", 
        color: "#ede8e0",
        textAlign: "center",
        minWidth: "200px"
    }
}).showToast();
    //re-render only weather section, to prevent full re-render
    //but only on game page
    if (history.state?.page === 'game' || !history.state) {
        const weatherSection = document.querySelector('.weather-forecast');
        if (weatherSection) {
            weatherSection.querySelector('.weather-icon').textContent = state.weather.icon;
            weatherSection.querySelector('.weather-type').textContent = state.weather.type;
            weatherSection.querySelector('.weather-perk').textContent = state.weather.perk;
        }
    }
    }
}
}