// main entrypoint for game
import { renderGame } from './game.js';
import { renderLexicon } from './lexicon.js';
import { renderShop } from './shop.js';
import loop from './loop.js';
import Toastify from 'https://cdn.skypack.dev/toastify-js';
import '../classes/HeaderElement.js';


const appContainer = document.getElementById('app');

function navigate(page, renderFunc) {
    const currentState = history.state;
    const currentPage = currentState ? currentState.page : 'game';
    
    if (currentPage === page) return;

    history.pushState({ page: page }, '', `#${page}`);
    //use view transition if supported
    if (!document.startViewTransition) {
        renderFunc(appContainer);
        return;
    }
    //use view transition API for smooth transitions
    document.startViewTransition(() => {
        renderFunc(appContainer);
    });
}
window.addEventListener('popstate', (event) => {
    if (event.state && event.state.page) {
        const pages = {
            'game': renderGame,
            'shop': renderShop,
            'lexicon': renderLexicon
        };
        
        const renderFunc = pages[event.state.page];
        if (renderFunc) {
            if (!document.startViewTransition) {
                renderFunc(appContainer);
            } else {
                document.startViewTransition(() => renderFunc(appContainer));
            }
        }
    }
});

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

window.addEventListener("offline", () => {
    Toastify({
        text: "You are offline. Some features may not work.",   
        duration: 3000,
        gravity: "top",
        position: "center",
        style: {
            position: "fixed",
            zIndex: "9999",
            top: "20px",
            background: "#a04848",
            color: "#fff",
            fontFamily: "'Lato', sans-serif",
            fontSize: "0.8rem",
            border: "2px solid #7c3f3f",
            boxShadow: "0 4px 0 #6b3030",
            textAlign: "center",
            minWidth: "200px"
        }
    }).showToast();
});

window.addEventListener("online", () => {   
    Toastify({
        text: "You are back online!",
        duration: 3000,
        gravity: "top", 
        position: "center",
        style: {
            position: "fixed",
            zIndex: "9999", 
            top: "20px",
            background: "#4a7c3f",
            color: "#fff",
            fontFamily: "'Lato', sans-serif",
            fontSize: "0.8rem",
            border: "2px solid #3a6b30",
            boxShadow: "0 4px 0 #2a4b20",
            textAlign: "center",
            minWidth: "200px"
        }
    }).showToast();
});
loop();






