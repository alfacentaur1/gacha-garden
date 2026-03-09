import { PACKS_CONFIG } from '../config/packsConfig.js';
import { renderGame } from './renderGame.js'; 

export function renderShop(container) {
    container.innerHTML = '';

    const shopPage = document.createElement('main');
    shopPage.id = 'page-shop';

    const header = document.createElement('header');
    header.classList.add('shop-header');
    header.innerHTML = `
        <button class="back-btn">← Back</button>
        <nav class="shop-tabs">
            <button class="tab active">Seed Shop</button>
            <button class="tab">Lexicon</button>
        </nav>
    `;

    header.querySelector('.back-btn').addEventListener('click', () => {
        renderGame(container);
    });

    const section = document.createElement('section');
    section.classList.add('packs-section');
    section.id = 'tab-seeds';

    const grid = document.createElement('div');
    grid.classList.add('packs-grid');

    Object.values(PACKS_CONFIG).forEach(packData => {
        grid.appendChild(createPackCard(packData));
    });

    section.appendChild(grid);
    shopPage.appendChild(header);
    shopPage.appendChild(section);


    container.appendChild(shopPage);
}


function createPackCard(pack) {
    const article = document.createElement('article');
    article.classList.add('pack');

    const chancesHTML = pack.loot.map(item => `
        <li class="chance-row ${item.plant.rarity.toLowerCase()}">
            <span>${getPlantEmoji(item.plant.name)} ${item.plant.name}</span>
            <span class="rarity">${item.chance}%</span>
        </li>
    `).join('');

    article.innerHTML = `
        <span class="pack-icon">${pack.icon}</span>
        <h3 class="pack-name">${pack.name}</h3>
        <ul class="pack-chances">
            ${chancesHTML}
        </ul>
        <button class="buy-btn" data-id="${pack.id}">Buy — $${pack.price}</button>
    `;

    return article;
}

function getPlantEmoji(name) {
    const emojis = { 'Tomato': '🍅', 'Wheat': '🌾', 'Pepper': '🌶️', 'Orange': '🍊', 'Banana': '🍌', 'Mushroom': '🍄' };
    return emojis[name] || '🌱';
}