import { PACKS_CONFIG } from '../config/packsConfig.js';

export function renderShop(container) {
    container.innerHTML = `
        <main id="page-shop">
            <header class="shop-header">
                <button class="back-btn">Back</button>
                <nav class="shop-tabs">
                    <button class="tab">Seed Shop</button>
                    <button class="tab" id="go-to-lexicon">Lexicon</button>
                </nav>
            </header>
            <section class="packs-grid"></section>
        </main>
    `;
    
    const grid = container.querySelector('.packs-grid');

    Object.values(PACKS_CONFIG).forEach(pack => {
        grid.appendChild(createPackCard(pack)); 
    });

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
    const emojis = { 
        'Tomato': '🍅', 'Wheat': '🌾', 'Pepper': '🌶️', 
        'Orange': '🍊', 'Banana': '🍌', 'Mushroom': '🍄' 
    };
    return emojis[name] || '🌱';
}

