import State from '../classes/State.js';

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
        <section class="lemonstand" style="cursor: pointer">
            <p id="sell-lemonade">click to sell lemonade</p>
            <img src="/img/lemonstand.png" alt="Lemon stand">
        </section>
    `;

    aside.querySelector('.lemonstand').addEventListener('click', () => {
        state.user.money += 1;
        state.user.moneyMade += 1;
        state.user.lemonadeSold += 1;
        renderGame(container);
    });

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

function createRightBottom(state, container) {
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