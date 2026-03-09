//main entrypoint for game
import { renderGame } from './game.js';
import State from '../classes/State.js';
import { renderLexicon } from './lexicon.js';
import { renderShop } from './shop.js';

const appContainer = document.getElementById('app');
renderGame(appContainer);
history.replaceState({ page: 'game' }, '', '#game');

const state = State.instance;

//add listeners for navigation
const shopAndLexiconNav = document.querySelector('.nav');
shopAndLexiconNav.addEventListener('click', (e) => {
    history.pushState({ page: 'shop',  }, '', '#shop');
    renderShop(appContainer);
});




//back nav
window.addEventListener('popstate', (event) => {
    if (event.state) {
        switch (event.state.page) { 
            case 'game':
                renderGame(appContainer);
                break;
            case 'shop':
                renderShop(appContainer);
                break;
            case 'lexicon':
                renderLexicon(appContainer);
                break;
        }
    }
});
