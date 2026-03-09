import { PLANTS_CONFIG } from './plantsConfig.js';
import { renderGame } from './game.js';

export function renderLexicon(container) {
    container.innerHTML = '';

    const lexiconPage = document.createElement('main');
    lexiconPage.id = 'page-lexicon';

    const header = document.createElement('header');
    header.classList.add('shop-header');
    header.innerHTML = `
        <button class="back-btn">← Back</button>
        <h2 class="lexicon-title">Plant Lexicon</h2>
    `;

    const grid = document.createElement('div');
    grid.classList.add('lexicon-grid');

    Object.values(PLANTS_CONFIG).forEach(plant => {
        const card = document.createElement('article');
        card.classList.add('lexicon-card', plant.rarity.toLowerCase());

        card.innerHTML = `
            <div class="lexicon-img-container">
                <img src="/img/${plant.image}" alt="${plant.name}" class="lexicon-img">
            </div>
            <div class="lexicon-details">
                <h3 class="plant-name">${plant.name}</h3>
                <span class="rarity-tag">${plant.rarity.toUpperCase()}</span>
                <div class="plant-stats">
                    <p>🕒 Growth: <strong>${plant.growthTime}m</strong></p>
                    <p>💰 Sell Price: <strong>$${plant.sellPrice}</strong></p>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });

    lexiconPage.appendChild(header);
    lexiconPage.appendChild(grid);
    container.appendChild(lexiconPage);
}