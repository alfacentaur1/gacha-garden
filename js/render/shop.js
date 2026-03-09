import { PACKS_CONFIG } from '../config/packsConfig.js';
import { renderGame } from './game.js';
import { renderLexicon } from './lexicon.js';

export function renderShop(container) {
    container.innerHTML = `
        <main id="page-shop">
            <header class="shop-header">
                <button class="back-btn">← Back</button>
                <nav class="shop-tabs">
                    <button class="tab active">Seed Shop</button>
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