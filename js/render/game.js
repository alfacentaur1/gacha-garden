import State from '../classes/State.js';
import { PACKS_CONFIG } from '../config/packsConfig.js';
import Toastify from 'https://cdn.skypack.dev/toastify-js';

export function renderGame(container) {
    const state = State.instance;
    container.innerHTML = '';

    const mainPage = document.createElement('main');
    mainPage.classList.add('layout');
    mainPage.id = 'page-game';

    mainPage.appendChild(createDashboard(state, container));
    mainPage.appendChild(createFields(state));
    mainPage.appendChild(createWeather(state));
    mainPage.appendChild(createSeeds(state));
    mainPage.appendChild(createRightBottom(state, container));

    container.appendChild(mainPage);
}

function createDashboard(state, container) {
    const aside = document.createElement('aside');
    aside.classList.add('dashboard');
    let sanitizedName = sanitize(state.user.name);
    aside.innerHTML = `
        <p> ${sanitizedName}'s electronic diary</p>
        <section class="statistics">
            <p>Statistics</p>
            <div class="stat-item">Money: $${state.user.money}</div>
            <div class="stat-item">Lemonade sold: ${state.user.lemonadeSold}</div>
            <div class="stat-item">Money made: $${state.user.moneyMade}</div>
        </section>
        <nav class="nav" id="nav">
            <p>seed shop and lexicon</p>
        </nav>
        <section class="trader">
            <p>trader</p>
            <p>watering can - $1500</p>
            <div class="trader-container">
                <img src="img/watering_can.png" alt="trader item" class="trader-item" draggable="false">
            </div>
        </section>
        <section class="lemonstand" style="cursor: pointer">
            <p id="sell-lemonade">click to sell lemonade</p>
            <img src="/img/lemonstand.png" alt="Lemon stand">
        </section>
        <video loop autoplay muted class="knight-video">
            <source src="./media/knight.mp4" type="video/mp4">
        </video>
    `;

    aside.querySelector('.lemonstand').addEventListener('click', () => {
        state.user.money += 1;
        state.user.moneyMade += 1;
        state.user.lemonadeSold += 1;
        const stats = aside.querySelector('.statistics');
    stats.innerHTML = `
        <p>Statistics</p>
        <div class="stat-item">Money: $${state.user.money}</div>
        <div class="stat-item">Lemonade sold: ${state.user.lemonadeSold}</div>
        <div class="stat-item">Money made: $${state.user.moneyMade}</div>
    `;
    });

    let traderItem = aside.querySelector('.trader-item');
    traderItem.addEventListener('click', () => {
        if(state.user.money >= 1500) {
            state.user.money -= 1500;
            //media
            const coinSound = new Audio('../media/coins.mp3');
            coinSound.play();
            state.user.inventory.itemInventory.wateringCan += 1;
            console.log('Bought watering can, total:', state.user.inventory.itemInventory.wateringCan);
            //render only watering can count, to prevent full re-render
            renderCanCount();
        } else {
            Toastify({
                text: "Not enough money for watering can!",
                duration: 3000,
                gravity: "top",
                position: "center",
                stopOnFocus: true,
                style: {
                    position: "fixed",
                    zIndex: "9999",
                    top: "20px",
                    background: "#a09880",
                    border: "2px solid #7c3f3f",
                    boxShadow: "0 4px 0 #7c3f3f",
                    fontFamily: "'Lato', sans-serif",
                    fontSize: "0.8rem",
                    borderRadius: "0px",
                    color: "#ede8e0",
                    textAlign: "center",
                    minWidth: "200px"
                }
            }).showToast();
        }
    });



    return aside;
}

function createFields() {
    const section = document.createElement('section');
    section.classList.add('fields-container');
    for (let i = 0; i < 2; i++) {
        const field = document.createElement('article');
        field.classList.add('field');
        field.innerHTML = '<div class="plot"></div>'.repeat(9);
        section.appendChild(field);
    }
    return section;
}

function createWeather(state) {
    const section = document.createElement('section');
    section.classList.add('weather-forecast');
    section.innerHTML = `
        <p>Weather forecast</p>
        <div class="weather-container">
            <span class="weather-icon">${state.weather.icon}</span>
            <div class="weather-info">
                <span class="weather-type">${state.weather.type}</span>
                <span class="weather-perk">${state.weather.perk}</span>
            </div>
        </div>
    `;
    return section;
}

function createSeeds(state) {
    const section = document.createElement('section');
    section.classList.add('seeds');
    const seedsHtml = Object.keys(PACKS_CONFIG).map(packKey => {
        const pack = PACKS_CONFIG[packKey];
        const count = state.user.inventory.seedInventory[pack.id] || 0;

        return `
            <div class="seed">
            <p id="seed-name">${pack.name}</p>
                <div class="seed-pack-image" draggable="true">
                    <img src="${pack.icon}" alt="${pack.name}" class="seed-icon">
                </div>
                <div class="seed-count">${count}</div>
            </div>
        `;
    }).join('');

    section.innerHTML = `
        <p class="seeds-title">SEEDS</p>
        <div class="seed-container">
            ${seedsHtml}
        </div>
    `;

    return section;
}

function createRightBottom(state, container) {
    const div = document.createElement('div');
    div.classList.add('right-bottom');
    let wateringCount = state.user.inventory.itemInventory.wateringCan;
    div.innerHTML = `
        <section class="tools">
            <p>Tools</p>
            <div class="tools-container">
                ${'<img src="img/watering_can.png" alt="tool" class="tool" draggable="true">' }
                <span class="tool-badge">free to use: ${wateringCount}</span>
            </div>
        </section>
        <section class="input-section">
            <p>What's your name, gardener?</p>
            <input type="text" id="name-input" placeholder="Hmmm...">
            <button class="save-name">Save</button>
        </section>
    `;

    div.querySelector('.save-name').addEventListener('click', () => {
        const input = div.querySelector('#name-input');
        if (input.value.trim() !== "") {
            state.user.name = input.value;
            renderGame(container);
        }
    });

    return div;
}

function sanitize(str) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;',
        "/": '&#x2F;',
    };
    const reg = /[&<>"'/]/ig;
    return str.replace(reg, (match) => map[match]);
}

function renderCanCount(){
    let can = document.querySelector('.tool-badge');
    can.textContent = `free to use: ${State.instance.user.inventory.itemInventory.wateringCan}`;
}
