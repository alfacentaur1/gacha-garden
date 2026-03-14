import State from '../classes/State.js';
import weatherConfig from '../config/weatherConfig.js';
import Toastify from 'https://cdn.skypack.dev/toastify-js';
import { renderGame } from './game.js';
import FieldsState from '../classes/FieldsState.js';

const state = State.instance;
const fieldState = FieldsState.instance;


export default function gameLoopRun() {
    setInterval(gameLoop, 1000); //run game loop every second


function gameLoop() {
    const now = Date.now();
    ['field1', 'field2'].forEach((fieldKey, fId) => {
        fieldState[fieldKey].forEach((plant, pId) => {
            if(plant && plant.isReady && plant.progress !== 100){
                plant.progress = 100;
                reloadCanvas(fId, pId, plant.progress);
            }
            if (plant && !plant.isReady) {
                const multiplier = state.weather.multiplier || 1;
                const elapsed = now - plant.plantedAt;
                const totalTime = (plant.growTime * 1000) / multiplier;
                
                plant.progress = Math.min(elapsed / totalTime, 1);

                if (plant.progress >= 1) {
                    plant.isReady = true;
                }
                reloadCanvas(fId, pId, plant.progress);
            }
        });
    });
    weatherChangeLoop();
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
export function reloadCanvas(fId, pId, progress) {
    const canvas = document.getElementById(`canvas-f${fId}-p${pId}`);
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    const fillHeight = canvas.height * progress;
    
    ctx.fillRect(0, canvas.height - fillHeight, canvas.width, fillHeight);
}
