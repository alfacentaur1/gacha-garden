// main entrypoint for game
import { renderGame } from './game.js';
import { renderLexicon } from './lexicon.js';
import { renderShop } from './shop.js';

const appContainer = document.getElementById('app');

function navigate(page, renderFunc) {
    const currentState = history.state;
    const currentPage = currentState ? currentState.page : 'game';
    //anti spam for nav
    if (currentPage === page) {
        console.log(`Navigace ignorována: Již jsi na stránce ${page}`);
        return;
    }
    //push new state to history and render page
    history.pushState({ page: page }, '', `#${page}`);
    renderFunc(appContainer);
}

appContainer.addEventListener('click', (e) => {
    const target = e.target;

    if (target.closest('.back-btn')) {
        navigate('game', renderGame);
    } 
    else if (target.closest('#go-to-shop') || target.closest('.nav-shop')) {
        navigate('shop', renderShop);
    } 
    else if (target.closest('#go-to-lexicon') || target.closest('.nav-lexicon')) {
        navigate('lexicon', renderLexicon);
    }

    else if (target.closest('#nav')) {
        navigate('shop', renderShop);
    }
});
//back button and forward button handling in browser
window.addEventListener('popstate', (event) => {
    if (event.state && event.state.page) {
        const pages = {
            'game': renderGame,
            'shop': renderShop,
            'lexicon': renderLexicon
        };
        
        const renderFunc = pages[event.state.page];
        if (renderFunc) renderFunc(appContainer);
    }
});

//this happens on first load, to render correct page based on url
const initialPage = window.location.hash.replace('#', '') || 'game';
history.replaceState({ page: initialPage }, '', `#${initialPage}`);

if (initialPage === 'shop') renderShop(appContainer);
else if (initialPage === 'lexicon') renderLexicon(appContainer);
else renderGame(appContainer);