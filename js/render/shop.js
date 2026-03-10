import { PACKS_CONFIG } from '../config/packsConfig.js';
import State from '../classes/State.js';
import Toastify from 'https://cdn.skypack.dev/toastify-js';

export function renderShop(container) {
    container.innerHTML = `
        <main id="page-shop">
            <header class="shop-header">
                <button class="back-btn">Back</button>
                <nav class="shop-tabs">
                    <button class="tab active">Seed Shop</button>
                    <button class="tab" id="go-to-lexicon">Lexicon</button>
                </nav>
            </header>
            <section class="packs-grid"></section>
        </main>
    `;
    
    const grid = container.querySelector('.packs-grid');
    const state = State.instance;


    Object.values(PACKS_CONFIG).forEach(pack => {
        grid.appendChild(createPackCard(pack)); 
    });

    grid.addEventListener('click', (e) => {
        const btn = e.target.closest('.buy-btn');
        if (!btn) return;

        const packId = btn.dataset.id;
        const pack = Object.values(PACKS_CONFIG).find(p => p.id === packId);

        if (!pack) return;

        if (state.user.money >= pack.price) {
            //media use
            const coinSound = new Audio('../media/coins.mp3');
            coinSound.play();
            state.user.money -= pack.price;
            //add to inventory
            state.user.inventory.seedInventory[pack.id] += 1;  
            showNotify(`You bought ${pack.name}!`, false);
        } else {
            showNotify(`Not enough money for ${pack.name}!`, true);
        }
    });
}


function createPackCard(pack) {
    const article = document.createElement('article');
    article.classList.add('pack');

    const chancesHTML = pack.loot.map(item => `
        <li class="chance-row ${item.plant.rarity.toLowerCase()}">
            <img src="${item.plant.image}" alt="${item.plant.name}" class="chance-icon">
            <p class="chance-name">${item.plant.name}</p>
            <span class="rarity">${item.chance}%</span>
        </li>
    `).join('');

    article.innerHTML = `
        <img src="${pack.icon}" alt="${pack.name}" class="pack-icon">
        <h3 class="pack-name">${pack.name}</h3>
        <ul class="pack-chances">
            ${chancesHTML}
        </ul>
        <button class="buy-btn" data-id="${pack.id}">Buy — $${pack.price}</button>
    `;
    return article;
}

function showNotify(text, isError = false) {
    Toastify({
        text: text,
        duration: 3000,
        gravity: "top",
        position: "center",
        style: {
            position: "fixed",
            zIndex: "9999",
            top: "20px",
            background: isError ? "#7c3f3f" : "#4a7c3f",
            border: "2px solid #a09880",
            boxShadow: isError ? "0 4px 0 #6b3030" : "0 4px 0 #3a6b30",
            fontFamily: "'Lato', sans-serif",
            fontSize: "0.8rem",
            color: "#ede8e0",
            textAlign: "center",
            minWidth: "200px"
        }
    }).showToast();
}
