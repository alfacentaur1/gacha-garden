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
            <section class="lexicon-grid">
                </section>
        </main>
    `;

}