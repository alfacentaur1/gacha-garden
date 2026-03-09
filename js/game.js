import State from './state.js';

//container is anchor for SPA
export function renderGame(container) {
    const state = State._instance;
    container.innerHTML = '';

    const mainPage = document.createElement('main');
    mainPage.classList.add('layout');
    mainPage.id = 'page-game';

    mainPage.appendChild(createDashboard(state));
    mainPage.appendChild(createFields(state));
    mainPage.appendChild(createWeather(state));
    mainPage.appendChild(createSeeds(state));
    mainPage.appendChild(createRightBottom(state));

    container.appendChild(mainPage);
}

function createDashboard(state) {
    const aside = document.createElement('aside');
    aside.classList.add('dashboard');
    aside.innerHTML = `
        <p>Gardeners electronic diary</p>
        <section class="statistics">
            <p>Statistics</p>
            <div class="stat-item">Money: $${state.user.money}</div>
            <div class="stat-item">Lemonade sold: ${state.user.lemonadeSold}</div>
            <div class="stat-item">Money made: $${state.user.moneyMade}</div>
        </section>
        <nav class="nav">
            <p>seed shop and lexicon</p>
        </nav>
        <section class="trader">
            <p>trader</p>
            <img src="img/trader.png" alt="trader-img">
            <div class="trader-container">
                ${'<button class="trader-item"></button>'.repeat(3)}
            </div>
        </section>
        <section class="lemonstand">
            <p id="sell-lemonade">click to sell lemonade</p>
            <img src="/img/lemonstand.png" alt="Lemon stand">
        </section>
    `;
    return aside;
}

function createFields(state) {
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
            <span class="weather-icon">☀️</span>
            <div class="weather-info">
                <span class="weather-type">Sunny</span>
                <span class="weather-perk">+20% crop growth</span>
            </div>
        </div>
    `;
    return section;
}

function createSeeds(state) {
    const section = document.createElement('section');
    section.classList.add('seeds');
    section.innerHTML = `
        <p>Seeds</p>
        <div class="seed-container">
            ${'<div class="seed"></div>'.repeat(6)}
        </div>
    `;
    return section;
}

function createRightBottom(state) {
    const div = document.createElement('div');
    div.classList.add('right-bottom');
    div.innerHTML = `
        <section class="tools">
            <p>Tools</p>
            <div class="tools-container">
                ${'<button class="tool"></button>'.repeat(3)}
            </div>
        </section>
        <section class="input-section">
            <p>What's your name, gardener?</p>
            <input type="text" placeholder="${state.user.name || 'John Smith'}">
            <button class="save-name">Save</button>
        </section>
    `;
    return div;
}