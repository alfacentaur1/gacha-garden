import { PLANTS_CONFIG } from '../config/plantsConfig.js';

export function renderLexicon(container) {
    container.innerHTML = `
        <main id="page-lexicon">
            <header class="shop-header">
                <button class="back-btn">Back</button>
                <nav class="shop-tabs">
                    <button class="tab" id="go-to-shop">Seed Shop</button>
                    <button class="tab active" id="go-to-lexicon">Lexicon</button>
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
    article.classList.add('lexicon-item', plant.rarity.toLowerCase());

    const rarityClass = `rarity-${plant.rarity.toLowerCase()}`;

article.innerHTML = `
        <div class="lexicon-image-wrapper">
            ${getPlantImageHTML(plant.name)}
        </div>
        <h3 class="lexicon-name">${plant.name}</h3>
        <span class="lexicon-rarity ${rarityClass}">${plant.rarity.toUpperCase()}</span>
        
        <div class="lexicon-stats">
            <div class="lexicon-stat">
                <dt>Growth</dt>
                <dd>${plant.growthTime}s</dd>
            </div>
            <div class="lexicon-stat">
                <dt>Sell</dt>
                <dd>$${plant.sellPrice}</dd>
            </div>
        </div>
    `;
    return article;
}

function getPlantImageHTML(name) {
    const plantImages = { 
        'Tomato': 'tomato.png', 'Wheat': 'wheat.png', 'Pepper': 'pepper.png', 
        'Orange': 'orange.png', 'Banana': 'banana.png', 'Mushroom': 'mushroom.png' 
    };
    
    const filename = plantImages[name] ;
    
    const imagePath = `img/${filename}`;
    
    return `<img src="${imagePath}" alt="${name}" class="lexicon-image" />`;
}