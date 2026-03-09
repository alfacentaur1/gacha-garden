import { PLANTS_CONFIG } from '../config/plantsConfig.js';
import { renderGame } from './game.js';
import { renderShop } from './shop.js';

export function renderLexicon(container) {
    container.innerHTML = `
        <main id="page-lexicon">
            <header class="shop-header">
                <button class="back-btn">← Back</button>
                <nav class="shop-tabs">
                    <button class="tab" id="go-to-shop">Seed Shop</button>
                    <button class="tab active">Lexicon</button>
                </nav>
            </header>
            <section class="lexicon-grid"></section>
        </main>
    `;

    const grid = container.querySelector('.lexicon-grid');

    Object.values(PLANTS_CONFIG).forEach(plant => {
        grid.appendChild(createLexiconCard(plant));
    });

    
}

function createLexiconCard(plant) {
    const article = document.createElement('article');
    article.classList.add('lexicon-card', plant.rarity.toLowerCase());

    article.innerHTML = `
        <div class="lexicon-img-container">
            <span class="lexicon-emoji">${getPlantEmoji(plant.name)}</span>
        </div>
        <div class="lexicon-details">
            <h3 class="plant-name">${plant.name}</h3>
            <span class="rarity-tag">${plant.rarity.toUpperCase()}</span>
            <div class="plant-stats">
                <p>🕒 Growth: <strong>${plant.growthTime}s</strong></p>
                <p>💰 Sell: <strong>$${plant.sellPrice}</strong></p>
            </div>
        </div>
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